import {
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Loading } from "../components/shared/Loading";
import { $api } from "../network/client";
import { LunchList } from "../components/lunch/LunchList";
import { components } from "../network/openapi/v1";
import { formatLocalDate } from "../helpers/dateFormat";

export const LunchPage: React.FC = () => {
  const {
    data,
    error,
    isLoading,
    refetch,
  } = $api.useQuery("get", "/api/lunch/week");

  const [startBound, setStartBound] = useState<string>("");
  const [endBound, setEndBound] = useState<string>("");
  const [day, setDay] = useState<string | null>(null);
  const [menu, setMenu] = useState<components["schemas"]["MenuDayDto2"]>(null);

  useEffect(() => {
    const days = data?.data?.days || [];
    if (data && days.length > 0 && day === null) {
      setDay(formatLocalDate());
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const days = data?.data?.days || [];
      if (days.length !== 0) {
        setStartBound(days[0].date ?? "");
        setEndBound(days[days.length - 1].date ?? "");
      }
    }
  }, [data]);

  useEffect(() => {
    if (day !== null) {
      const days = data?.data?.days || [];
      const m = days.filter(d => d.date === day)[0];
      setMenu(m);
    }
  }, [day, data]);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Lunch</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lunch</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher
          slot="fixed"
          onIonRefresh={async (event: RefresherCustomEvent) => {
            await refetch();
            event.detail.complete();
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {isLoading && <Loading message="Loading lunch..." />}

        {error && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>Failed to load lunch.</p>
            </IonText>
          </div>
        )}

        {data && (
          <>
            <IonList>
              <IonItem>
                <IonLabel>Date</IonLabel>
                <IonDatetimeButton datetime="datetime" slot="end" />
              </IonItem>
              <LunchList data={menu} />
            </IonList>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                id="datetime"
                presentation="date"
                min={startBound}
                max={endBound}
                value={day}
                onIonChange={e => setDay(e.detail.value as string)}
              />
            </IonModal>

          </>
        )}
      </IonContent>
    </IonPage>
  );
};

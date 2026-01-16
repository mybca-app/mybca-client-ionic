import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { ArrivalList } from "../components/buses/ArrivalList";
import { Loading } from "../components/shared/Loading";
import { $api } from "../network/client";

interface BusDetailParams {
  bus: string;
}

export const BusDetailPage: React.FC = () => {
  const { bus: busRaw } = useParams<BusDetailParams>();
  const bus = decodeURIComponent(busRaw);

  const { data: infoData, error: infoError, isLoading: infoIsLoading } = $api.useQuery(
    "get",
    "/api/Bus/Info",
    { params: { query: { bus: bus } } },
  );

  const { data: histData, error: histError, isLoading: histIsLoading } = $api.useQuery(
    "get",
    "/api/Bus/History",
    { params: { query: { bus: bus } } },
  );

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{bus}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {infoIsLoading && <Loading message="Loading bus info..." />}

        {infoError && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>Failed to load bus info.</p>
            </IonText>
          </div>
        )}

        {infoData && (
          <IonList>
            <IonListHeader>
              <IonLabel>Bus Info</IonLabel>
            </IonListHeader>
            <IonItem style={{ "--background": "transparent" }}>
              <IonLabel>
                Company
              </IonLabel>
                <IonLabel slot="end" color="medium">
                  {infoData.company ? infoData.company.name : "N/A"}
                </IonLabel>
            </IonItem>
          </IonList>
        )}

        {histIsLoading && <Loading message="Loading arrival history..." />}

        {histError && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>Failed to load arrival history.</p>
            </IonText>
          </div>
        )}

        {histData && <ArrivalList data={histData} />}
      </IonContent>
    </IonPage>
  );
};

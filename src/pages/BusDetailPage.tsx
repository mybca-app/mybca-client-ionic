import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
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

  const { data, error, isLoading } = $api.useQuery(
    "get",
    "/api/Bus/{bus}/History",
    { params: { path: { bus: bus } } },
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
        {isLoading && <Loading message="Loading arrival history..." />}

        {error && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>Failed to load arrival history.</p>
            </IonText>
          </div>
        )}

        {data && <ArrivalList data={data} />}
      </IonContent>
    </IonPage>
  );
};

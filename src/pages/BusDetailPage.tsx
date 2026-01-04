import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonSpinner, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { useParams } from "react-router";
import { ArrivalList } from "../components/buses/ArrivalList";
import { $api } from "../network/client";

interface BusDetailParams {
  bus: string;
}

const BusDetailPage: React.FC = () => {
  const { bus: busRaw } = useParams<BusDetailParams>();
  const bus = decodeURIComponent(busRaw);

  const { data, error, isLoading } = $api.useQuery(
    "get",
    "/api/Bus/{bus}/History",
    { params: { path: { bus: bus } } },
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{bus}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoading && (
          <div className="ion-text-center ion-padding">
            <IonSpinner />
            <IonText color="medium">
              <p>Loading arrival history...</p>
            </IonText>
          </div>
        )}

        {error && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>
                Failed to load arrival history.
              </p>
            </IonText>
          </div>
        )}

        {data && <ArrivalList data={data} />}
      </IonContent>
    </IonPage>
  );
}

export default BusDetailPage;
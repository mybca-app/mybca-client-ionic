import { IonChip, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { $api } from '../network/network';

const BusList: React.FC = () => {
  const { data, error, isLoading } = $api.useQuery(
    "get",
    "/api/bus/List",
  );

  if (isLoading || !data) return "Loading...";



  return (
    <IonList>
      {Object.keys(data.data).sort().map(key => (
        <IonItem>
          <IonLabel>
            <h2>{key}</h2>
            <p>
              {data.data[key] ? "Arrived at BCA" : "Not at BCA"}
            </p>
          </IonLabel>
          {data.data[key] && <IonChip slot="end" color="primary">{data.data[key]}</IonChip>}
        </IonItem>
      ))}
    </IonList>
  )
}

const BusListPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buses</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Buses</IonTitle>
          </IonToolbar>
        </IonHeader>
        <BusList />
      </IonContent>
    </IonPage>
  );
};

export default BusListPage;

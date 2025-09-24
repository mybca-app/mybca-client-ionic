import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherCustomEvent } from '@ionic/react';
import { BusCard } from '../components/home/BusCard';
import { LunchCard } from '../components/home/LunchCard';
import { $api } from '../network/client';

const HomePage: React.FC = () => {
  const {
    data: busData,
    error: busError,
    isLoading: busIsLoading,
    refetch: busRefetch,
  } = $api.useQuery("get", "/api/bus/List");

  const {
    data: lunchData,
    error: lunchError,
    isLoading: lunchIsLoading,
    refetch: lunchRefetch,
  } = $api.useQuery("get", "/api/lunch/Day");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>myBCA</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">myBCA</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" onIonRefresh={async (event: RefresherCustomEvent) => {
          await busRefetch();
          await lunchRefetch();
          event.detail.complete();
        }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <BusCard busData={busData?.data ?? {}} isLoading={busIsLoading} error={busError} />
        <LunchCard lunchData={lunchData?.data} isLoading={lunchIsLoading} error={lunchError} />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherCustomEvent } from '@ionic/react';
import { BusCard } from '../components/home/BusCard';
import { LunchCard } from '../components/home/LunchCard';
import { $api } from '../network/client';
import { LinksCard } from '../components/home/LinksCard';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

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

  const {
    data: linksData,
    error: linksError,
    isLoading: linksIsLoading,
    refetch: linksRefetch
  } = $api.useQuery("get", "/api/links");

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
          await linksRefetch();
          event.detail.complete();
        }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <BusCard busData={busData?.data ?? {}} isLoading={busIsLoading} error={busError} />
        <LunchCard lunchData={lunchData?.data} isLoading={lunchIsLoading} error={lunchError} />
        <LinksCard linksData={linksData?.data ?? []} isLoading={linksIsLoading} error={linksError} />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

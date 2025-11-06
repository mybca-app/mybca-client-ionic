import { IonContent, IonHeader, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherCustomEvent } from '@ionic/react';
import { BusCard } from '../components/home/BusCard';
import { LunchCard } from '../components/home/LunchCard';
import { $api } from '../network/client';
import { LinksCard } from '../components/home/LinksCard';
import { useQuery } from '@tanstack/react-query';
import { pb } from '../network/nexusPocketbase';
import { EventsCard } from '../components/home/EventsCard';
import { Event } from '../network/pocketbase/pocketbase';

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

  const {
    data: eventsData,
    error: eventsError,
    isLoading: eventsIsLoading,
    refetch: eventsRefetch
  } = useQuery({
    queryKey: ["events-homepage-card"],
    queryFn: () => pb.collection("events").getList(1, 3, {
      expand: "organization",
      filter: "eventTime >= @now",
      sort: "eventTime"
    }),
  });

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
          await eventsRefetch();
          event.detail.complete();
        }}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <BusCard busData={busData?.data ?? {}} isLoading={busIsLoading} error={busError} />
        <EventsCard eventData={(eventsData?.items as unknown[] as Event[]) ?? []} isLoading={eventsIsLoading} error={eventsError} />
        <LunchCard lunchData={lunchData?.data} isLoading={lunchIsLoading} error={lunchError} />
        <LinksCard linksData={linksData?.data ?? []} isLoading={linksIsLoading} error={linksError} />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

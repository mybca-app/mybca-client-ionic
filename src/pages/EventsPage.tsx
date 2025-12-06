import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { pb } from "../network/eventsPocketbase";
import { EventsList } from "../components/events/EventsList";
import { Event } from "../network/pocketbase/pocketbase";

const EventsPage: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["events-eventspage"],
    queryFn: () =>
      pb.collection("events").getList(1, 50, {
        expand: "organization",
        filter: "eventTime >= @now",
        sort: "eventTime",
      }),
    refetchInterval: 60 * 1000,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Events</IonTitle>
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

        {isLoading && (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
            <IonText color="medium">
              <p>Loading events...</p>
            </IonText>
          </div>
        )}

        {error && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>Failed to load events.</p>
            </IonText>
          </div>
        )}

        {data && <EventsList data={data.items as unknown[] as Event[]} />}
      </IonContent>
    </IonPage>
  );
};

export default EventsPage;

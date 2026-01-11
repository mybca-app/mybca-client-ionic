import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { BusCard } from "../components/home/BusCard";
import { EventsCard } from "../components/home/EventsCard";
import { LinksCard } from "../components/home/LinksCard";
import { LunchCard } from "../components/home/LunchCard";
import { $api } from "../network/client";
import { pb } from "../network/eventsPocketbase";
import { Event } from "../network/pocketbase/pocketbase";
import { formatLocalDate } from "../helpers/dateFormat";
import { ScheduleCard } from "../components/home/ScheduleCard";
import { NewsCard } from "../components/home/NewsCard";

function getTimeGreeting(): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour <= 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export const HomePage: React.FC = () => {
  const {
    data: scheduleData,
    error: scheduleError,
    isLoading: scheduleIsLoading,
    refetch: scheduleRefetch,
  } = $api.useQuery(
    "get",
    "/api/Schedule/Day/{date}",
    { params: { path: { date: formatLocalDate() } } }
  );

  const {
    data: busData,
    error: busError,
    isLoading: busIsLoading,
    refetch: busRefetch,
  } = $api.useQuery("get", "/api/Bus/List");

  const {
    data: lunchData,
    error: lunchError,
    isLoading: lunchIsLoading,
    refetch: lunchRefetch,
  } = $api.useQuery("get", "/api/Lunch/Day");

  const {
    data: linksData,
    error: linksError,
    isLoading: linksIsLoading,
    refetch: linksRefetch,
  } = $api.useQuery("get", "/api/Links");

  const {
    data: newsData,
    error: newsError,
    isLoading: newsIsLoading,
    refetch: newsRefetch,
  } = $api.useQuery("get", "/api/News/Stories/Latest");

  const {
    data: eventsData,
    error: eventsError,
    isLoading: eventsIsLoading,
    refetch: eventsRefetch,
  } = useQuery({
    queryKey: ["events-homepage-card"],
    queryFn: () =>
      pb.collection("events").getList(1, 3, {
        expand: "organization",
        filter: "eventTime >= @now",
        sort: "eventTime",
      }),
  });

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>myBCA</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonText color="medium" className="ion-padding" style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}>
              myBCA
            </IonText>
            <IonTitle className="ion-padding-top" size="large">👋 {getTimeGreeting()}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher
          slot="fixed"
          onIonRefresh={async (event: RefresherCustomEvent) => {
            await scheduleRefetch();
            await busRefetch();
            await lunchRefetch();
            await linksRefetch();
            await eventsRefetch();
            await newsRefetch();
            event.detail.complete();
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol size="12" sizeMd="6">
              <BusCard
                busData={busData?.data ?? {}}
                isLoading={busIsLoading}
                error={busError}
              />
              {scheduleData && Object.keys(scheduleData).length > 0
                && <ScheduleCard schedule={scheduleData?.schedule || null} />}
              <LunchCard
                lunchData={lunchData?.data}
                isLoading={lunchIsLoading}
                error={lunchError}
              />
            </IonCol>
            <IonCol size="12" sizeMd="6">
              <NewsCard
                newsData={newsData?.data ?? null}
                isLoading={newsIsLoading}
                error={newsError}
              />
              <EventsCard
                eventData={(eventsData?.items as unknown[] as Event[]) ?? []}
                isLoading={eventsIsLoading}
                error={eventsError}
              />
              <LinksCard
                linksData={linksData?.data ?? []}
                isLoading={linksIsLoading}
                error={linksError}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

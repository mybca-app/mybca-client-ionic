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
  useIonViewWillEnter,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { BusCard } from "../components/home/BusCard";
import { EventsCard } from "../components/home/EventsCard";
import { LinksCard } from "../components/home/LinksCard";
import { LunchCard } from "../components/home/LunchCard";
import { $api } from "../network/client";
import { pb } from "../network/eventsPocketbase";
import { Event } from "../network/pocketbase/pocketbase";
import { formatLocalDate, getTimeGreeting } from "../helpers/dateFormat";
import { ScheduleCard } from "../components/home/ScheduleCard";
import { NewsCard } from "../components/home/NewsCard";
import { GreetingText } from "../components/home/greeting/GreetingText";
import { HomeHeader } from "../components/home/greeting/HomeHeader";
import { useEffect, useState } from "react";
import { getFavorites } from "../storage/favoriteBus";

export const HomePage: React.FC = () => {
  const {
    data: scheduleData,
    error: scheduleError,
    isLoading: scheduleIsLoading,
    refetch: scheduleRefetch,
  } = $api.useQuery(
    "get",
    "/api/schedules/{date}",
    { params: { path: { date: formatLocalDate() } } }
  );

  const {
    data: busData,
    error: busError,
    isLoading: busIsLoading,
    refetch: busRefetch,
  } = $api.useQuery("get", "/api/buses");

  const {
    data: lunchData,
    error: lunchError,
    isLoading: lunchIsLoading,
    refetch: lunchRefetch,
  } = $api.useQuery("get", "/api/lunch/day");

  const {
    data: linksData,
    error: linksError,
    isLoading: linksIsLoading,
    refetch: linksRefetch,
  } = $api.useQuery("get", "/api/links");

  const {
    data: newsData,
    error: newsError,
    isLoading: newsIsLoading,
    refetch: newsRefetch,
  } = $api.useQuery("get", "/api/news/stories/latest");

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

  const [starredBuses, setStarredBuses] = useState<string[]>([]);
  const loadFavorites = async () => {
    const value = await getFavorites();
    if (value && value.length !== 0) {
      setStarredBuses(value);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  useIonViewWillEnter(() => {
    loadFavorites();
  });

  const [busPositions, setBusPositions] = useState<Record<string, string>>({});
  useEffect(() => {
    const newPos: Record<string, string> = {};

    Object.entries((busData?.data || {}))
      .filter(([k, _]) => starredBuses.includes(k))
      .forEach(([k, v]) => newPos[k] = v);

    setBusPositions(newPos);
  }, [busData, starredBuses]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <HomeHeader
          busPositions={busPositions}
          lunchDay={lunchData?.data || null}
        />

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
          style={{
            paddingTop: "calc(env(safe-area-inset-top) + 40px)",
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol size="12" sizeMd="6">
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

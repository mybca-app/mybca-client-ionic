import { Preferences } from "@capacitor/preferences";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from "@ionic/react";
import {
  informationCircleOutline,
  linkOutline,
  timeOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { $api } from "../network/client";
import { BusList } from "../components/buses/BusList";
import { FAVORITE_BUS_PREFERENCES_KEY } from "../storage/favoriteBus";

const BUS_SHEET_URL =
  "https://docs.google.com/spreadsheets/u/1/d/1S5v7kTbSiqV8GottWVi5tzpqLdTrEgWEY4ND4zvyV3o/htmlview#gid=0";

const BusListPage: React.FC = () => {
  const { data, error, isLoading, refetch } = $api.useQuery(
    "get",
    "/api/bus/List",
    {},
    {
      refetchInterval: 60 * 1000,
    },
  );

  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      const { value } = await Preferences.get({
        key: FAVORITE_BUS_PREFERENCES_KEY,
      });
      if (value) {
        setFavorites(JSON.parse(value));
      }
      setLoaded(true);
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const saveFavorites = async () => {
      await Preferences.set({
        key: FAVORITE_BUS_PREFERENCES_KEY,
        value: JSON.stringify(favorites),
      });
    };
    saveFavorites();
  }, [favorites]);

  const toggleFavorite = (bus: string) => {
    setFavorites((prev) =>
      prev.includes(bus) ? prev.filter((b) => b !== bus) : [...prev, bus],
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buses</IonTitle>
          <IonButtons slot="end">
            <IonButton id="buslist-options-menu-trigger">
              <IonIcon slot="icon-only" icon={informationCircleOutline} />
            </IonButton>
            <IonPopover
              trigger="buslist-options-menu-trigger"
              triggerAction="click"
            >
              <IonList>
                {data?.expiry && (
                  <IonItem>
                    <IonIcon slot="start" icon={timeOutline} />
                    <IonLabel>
                      Expires at {new Date(data.expiry).toLocaleTimeString()}
                    </IonLabel>
                  </IonItem>
                )}
                <IonItem href={BUS_SHEET_URL} target="_blank">
                  <IonIcon slot="start" icon={linkOutline} />
                  <IonLabel>View spreadsheet</IonLabel>
                </IonItem>
              </IonList>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Buses</IonTitle>
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
              <p>Loading buses...</p>
            </IonText>
          </div>
        )}

        {error && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>
                Failed to load buses. Click on the
                <IonIcon icon={informationCircleOutline} />
                button to view the bus spreadsheet directly.
              </p>
            </IonText>
          </div>
        )}

        {data && (
          <BusList
            data={data.data}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default BusListPage;

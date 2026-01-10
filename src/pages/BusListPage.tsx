import { Capacitor } from "@capacitor/core";
import {
  DefaultSystemBrowserOptions,
  InAppBrowser,
} from "@capacitor/inappbrowser";
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
import { BusList } from "../components/buses/BusList";
import { Loading } from "../components/shared/Loading";
import {
  areNotificationsEnabled,
  subscribeToBus,
  unsubscribeFromBus,
} from "../helpers/notifications";
import { $api } from "../network/client";
import {
  getFavorites,
  setFavorites as storeFavorites,
} from "../storage/favoriteBus";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

function openBusSpreadsheet(): void {
  (async () => {
    await InAppBrowser.openInSystemBrowser({
      url: import.meta.env.VITE_BUS_SHEET_URL,
      options: DefaultSystemBrowserOptions,
    });
  })();
}

export const BusListPage: React.FC = () => {
  const { data, error, isLoading, refetch } = $api.useQuery(
    "get",
    "/api/Bus/List",
    {},
    {
      refetchInterval: 60 * 1000,
    },
  );

  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      setFavorites(await getFavorites());
      setLoaded(true);
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const saveFavorites = async () => {
      storeFavorites(favorites);
    };
    saveFavorites();
  }, [favorites]);

  const toggleFavorite = async (bus: string) => {
    await Haptics.impact({ style: ImpactStyle.Medium });
    
    let isDisable = false;
    setFavorites((prev) => {
      if (prev.includes(bus)) {
        isDisable = true;
        return prev.filter((b) => b !== bus);
      } else {
        return [...prev, bus];
      }
    });

    const notifsEnabled = await areNotificationsEnabled();
    if (notifsEnabled) {
      if (isDisable) {
        await unsubscribeFromBus(bus);
      } else {
        await subscribeToBus(bus);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader translucent>
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
                {Capacitor.isNativePlatform() ? (
                  <IonItem button onClick={openBusSpreadsheet}>
                    <IonIcon slot="start" icon={linkOutline} />
                    <IonLabel>View spreadsheet</IonLabel>
                  </IonItem>
                ) : (
                  <IonItem
                    href={import.meta.env.VITE_BUS_SHEET_URL}
                    target="_blank"
                  >
                    <IonIcon slot="start" icon={linkOutline} />
                    <IonLabel>View spreadsheet</IonLabel>
                  </IonItem>
                )}
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

        {isLoading && <Loading message="Loading buses..." />}

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

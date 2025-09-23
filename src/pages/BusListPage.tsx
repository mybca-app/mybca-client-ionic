import {
  IonButton,
  IonButtons,
  IonChip,
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
  IonSearchbar,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent
} from '@ionic/react';
import { ellipsisVertical, informationCircleOutline, linkOutline, star, starOutline, timeOutline } from 'ionicons/icons';
import { $api } from '../network/network';
import { useEffect, useState } from 'react';
import { Preferences } from '@capacitor/preferences';

type BusListProps = {
  data: Record<string, any>;
  favorites: string[];
  onToggleFavorite: (bus: string) => void;
};

const BUS_SHEET_URL = "https://docs.google.com/spreadsheets/u/1/d/1S5v7kTbSiqV8GottWVi5tzpqLdTrEgWEY4ND4zvyV3o/htmlview#gid=0";
const FAVORITE_BUS_PREFERENCES_KEY = "mybca_favorite_bus";

const BusList: React.FC<BusListProps> = ({ data, favorites, onToggleFavorite }) => {
  const sortedKeys = Object.keys(data).sort((a, b) => {
    const aFav = favorites.includes(a);
    const bFav = favorites.includes(b);

    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return a.localeCompare(b);
  });

  const handleInput = (event: Event) => {
    let query = "";
    const target = event.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(sortedKeys.filter((d) => d.toLowerCase().indexOf(query) > -1));
  }

  const [results, setResults] = useState([...sortedKeys]);
  return (
    <>
      <IonSearchbar onIonInput={handleInput}></IonSearchbar>
      <IonList>
        {results.map((key) => {
          const isFavorite = favorites.includes(key);

          return (
            <IonItem key={key}>
              <IonButton
                slot="start"
                color={isFavorite ? "warning" : "medium"}
                fill="clear"
                size="default"
                onClick={() => onToggleFavorite(key)}
              >
                <IonIcon slot="icon-only" icon={isFavorite ? star : starOutline} />
              </IonButton>
              <IonLabel>
                <h2>{key}</h2>
                <p>{data[key] ? "Arrived at BCA" : "Not at BCA"}</p>
              </IonLabel>
              {data[key] && (
                <IonChip slot="end" color="primary">
                  {data[key]}
                </IonChip>
              )}
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
};

const BusListPage: React.FC = () => {
  const { data, error, isLoading, refetch } = $api.useQuery("get", "/api/bus/List", {}, {
    refetchInterval: 60 * 1000,
  });

  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const loadFavorites = async () => {
      const { value } = await Preferences.get({ key: FAVORITE_BUS_PREFERENCES_KEY });
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
      prev.includes(bus) ? prev.filter((b) => b !== bus) : [...prev, bus]
    );
  };

  const ToolbarButtons: React.FC = () => {
    return (
      <IonButtons slot="primary">
        <IonButton id="buslist-options-menu-trigger">
          <IonIcon slot="icon-only" ios={informationCircleOutline} md={informationCircleOutline} />
        </IonButton>
        <IonPopover trigger="buslist-options-menu-trigger" triggerAction="click">
          <IonList>
            {data?.expiry && (
              <IonItem>
                <IonIcon slot="start" icon={timeOutline} />
                <IonLabel>Expires at {new Date(data.expiry).toLocaleTimeString()}</IonLabel>
              </IonItem>
            )}
            <IonItem href={BUS_SHEET_URL} target="_blank">
              <IonIcon slot="start" icon={linkOutline} />
              <IonLabel>View spreadsheet</IonLabel>
            </IonItem>
          </IonList>
        </IonPopover>
      </IonButtons>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buses</IonTitle>
          <ToolbarButtons />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Buses</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" onIonRefresh={async (event: RefresherCustomEvent) => {
          await refetch();
          event.detail.complete();
        }}>
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
              <p>Failed to load buses. Please try again later.</p>
            </IonText>
          </div>
        )}

        {data && (
          <>
            <BusList data={data.data} favorites={favorites} onToggleFavorite={toggleFavorite} />
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BusListPage;

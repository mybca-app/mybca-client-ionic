import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonList,
  IonText,
  useIonViewWillEnter,
} from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites } from "../../storage/favoriteBus";
import { BusListEntry } from "../buses/BusListEntry";
import { Loading } from "../shared/Loading";

type BusCardProps = {
  busData: Record<string, string>;
  isLoading: boolean;
  error: Error | null;
};

export const BusCard: React.FC<BusCardProps> = ({
  busData,
  isLoading,
  error,
}) => {
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

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Starred Buses</IonCardTitle>
      </IonCardHeader>

      {isLoading && <Loading message="Loading buses..." />}

      {error && (
        <div className="ion-text-center ion-padding">
          <IonText color="danger">
            <p>Failed to load buses. Please try again later.</p>
          </IonText>
        </div>
      )}

      {busData && (
        <IonCardContent>
          {starredBuses.length === 0 ? (
            <IonText>
              You haven't starred any buses yet. Star your favorite buses on the{" "}
              <Link to="/buses/list">Buses</Link>
              &nbsp;page to get quick access to them when you open the myBCA
              app.
            </IonText>
          ) : (
            <IonList inset={false} style={{ background: "transparent" }}>
              {Object.keys(busData || {})
                .filter((k) => starredBuses.includes(k))
                .map((town) => (
                  <BusListEntry
                    town={town}
                    key={town}
                    position={busData[town] ?? null}
                    standalone
                  />
                ))}
            </IonList>
          )}
        </IonCardContent>
      )}

      <IonButton fill="clear" routerLink="/buses/list">
        Go to Buses
        <IonIcon icon={arrowForward} slot="end" />
      </IonButton>
    </IonCard>
  );
};

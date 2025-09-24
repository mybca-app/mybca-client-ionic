import { Preferences } from "@capacitor/preferences";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonList, IonButton, IonIcon, IonSpinner } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FAVORITE_BUS_PREFERENCES_KEY } from "../../storage/favoriteBus";
import { BusListEntry } from "../buses/BusListEntry";

type BusCardProps = {
  busData: Record<string, string>;
  isLoading: boolean;
  error: Error | null;
};

export const BusCard: React.FC<BusCardProps> = ({ busData, isLoading, error }) => {
  const [starredBuses, setStarredBuses] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const { value } = await Preferences.get({ key: FAVORITE_BUS_PREFERENCES_KEY });
      if (value) {
        setStarredBuses(JSON.parse(value));
      }
    })();
  }, []);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Starred buses</IonCardTitle>
      </IonCardHeader>

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

      {busData &&
        <IonCardContent>
          {starredBuses.length === 0 ? (
            <IonText>
              You haven't starred any buses yet. Star your favorite buses on the <Link to="/buses/list">Buses</Link>
              &nbsp;page to get quick access to them when you open the myBCA app.
            </IonText>
          ) : (
            <IonList inset={false} style={{ "background": "transparent" }}>
              {Object.keys(busData || {}).filter(k => starredBuses.includes(k)).map(town => (
                <BusListEntry
                  town={town}
                  position={busData[town] ?? null}
                  standalone
                />
              ))}
            </IonList>
          )}
        </IonCardContent>
      }

      <IonButton fill="clear" routerLink="/buses/list">
        Go to buses
        <IonIcon icon={arrowForward} slot="end" />
      </IonButton>
    </IonCard>
  )
}
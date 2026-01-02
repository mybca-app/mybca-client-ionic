import { IonItem, IonButton, IonIcon, IonLabel, IonChip } from "@ionic/react";
import { informationCircleOutline, star, starOutline, timeOutline } from "ionicons/icons";

type BusListEntryProps = {
  town: string;
  position: string | null;
  isFavorite?: boolean;
  onToggleFavorite?: (key: string) => void;
  standalone?: boolean;
};

export const BusListEntry: React.FC<BusListEntryProps> = ({
  town,
  position,
  isFavorite,
  onToggleFavorite,
  standalone,
}) => {
  return (
    <IonItem
      className={standalone ? "ion-no-padding" : ""}
      style={{ "--background": "transparent" }}
    >
      {typeof isFavorite !== "undefined" &&
        typeof onToggleFavorite !== "undefined" && (
          <IonButton
            slot="start"
            color={isFavorite ? "warning" : "medium"}
            fill="clear"
            size="default"
            onClick={() => onToggleFavorite(town)}
          >
            <IonIcon slot="icon-only" icon={isFavorite ? star : starOutline} />
          </IonButton>
        )}
      
      <IonLabel>
        <h2>{town}</h2>
        <p>{position ? "Arrived at BCA" : "Not at BCA"}</p>
      </IonLabel>
      {position && (
        <IonChip slot="end" color="primary">
          {position}
        </IonChip>
      )}
      <IonButton
        slot="end"
        color="medium"
        routerLink={standalone ? "" : `/buses/${encodeURIComponent(town)}/detail`}
        fill="clear"
        size="default"
      >
        <IonIcon slot="icon-only" icon={informationCircleOutline} />
      </IonButton>
    </IonItem>
  );
};

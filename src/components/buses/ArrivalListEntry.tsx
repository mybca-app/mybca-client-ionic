import { IonItem, IonLabel } from "@ionic/react";

type ArrivalListEntryProps = {
  town: string;
  position: string;
  arrivalTime: Date;
};

export const ArrivalListEntry: React.FC<ArrivalListEntryProps> = ({
  town,
  position,
  arrivalTime,
}) => {
  return (
    <IonItem
      style={{ "--background": "transparent" }}
    >
      <IonLabel>
        <h2>Arrived in {position}</h2>
        <p>Detected {arrivalTime.toLocaleString()} - {town}</p>
      </IonLabel>
    </IonItem>
  );
};

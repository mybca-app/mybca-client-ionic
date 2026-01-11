import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { components } from "../../network/openapi/v1";
import { formatTimeByLocale } from "../../helpers/dateFormat";

type ScheduleCardProps = {
  schedule: components["schemas"]["ScheduleDto"];
};

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  schedule,
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Schedule</IonCardTitle>
        <IonCardSubtitle>{schedule?.name}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {schedule && (
          <IonList inset={false} style={{ background: "transparent" }}>
            {schedule.items.map(({ periodName, startTime, endTime }) => (
              <IonItem
                key={periodName}
                className="ion-no-padding"
                style={{ "--background": "transparent" }}
              >
                <IonLabel>{periodName}</IonLabel>
                <IonLabel slot="end">{formatTimeByLocale(startTime ?? "")}–{formatTimeByLocale(endTime ?? "")}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonCardContent>
    </IonCard>
  );
};

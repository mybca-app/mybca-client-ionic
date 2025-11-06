import { IonChip, IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { location, people } from "ionicons/icons";
import { getShortMonth, getShortTime } from "../../helpers/dateFormat";
import { Event } from "../../network/pocketbase/pocketbase";

type EventsListEntryProps = {
  event: Event;
  standalone?: boolean;
};

export const EventsListEntry: React.FC<EventsListEntryProps> = ({ event, standalone }) => {
  const date = new Date(event.eventTime);

  return (
    <IonItem className={standalone ? "ion-no-padding" : ""} style={{ "--background": "transparent" }}>
      <div style={{textAlign: "center", paddingRight: "15px"}}>
        <p style={{marginBlockEnd: "0"}}><IonText>{getShortMonth(date)}</IonText></p>
        <p style={{marginBlockStart: "0", marginBlockEnd: "0"}}>
          <IonText>
            <h2 style={{marginBlockStart: "0", marginBlockEnd: "0"}}>{date.getDate()}</h2>
          </IonText>
        </p>
        <p style={{marginBlockStart: "0", width: "4em"}}>
          <IonText><sub>{getShortTime(date)}</sub></IonText>
        </p>
      </div>
      <IonLabel>
        <h2>{event.title}</h2>
        <p>{event.description || "No description provided."}</p>
        <div>
          {event.location &&
            <IonChip color="primary">
              <IonIcon icon={location} />
              <IonLabel>
                {event.location}
              </IonLabel>
            </IonChip>
          }
          {event.organization &&
            <IonChip>
              <IonIcon icon={people} />
              <IonLabel>
                {event.expand["organization"].name}
              </IonLabel>
            </IonChip>
          }
        </div>
      </IonLabel>
    </IonItem>
  )
};
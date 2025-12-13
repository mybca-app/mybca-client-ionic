import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, IonText } from "@ionic/react";
import { EventsListEntry } from "./EventsListEntry";
import { Event } from "../../network/pocketbase/pocketbase";

type EventsListProps = {
  data: Event[];
};

export const EventsList: React.FC<EventsListProps> = ({ data }) => {
  return (
    <>
      <div className="ion-padding">
        <IonText>
          Want your club's events to be featured here? Fill out &#32;
          <a href={import.meta.env.VITE_EVENT_FORM_URL} target="_blank" rel="noopener noreferrer">this form</a>.
        </IonText>
      </div>
      {data.length === 0 ? (
        <div className="ion-text-center ion-padding">
          <IonText>There are no upcoming events.</IonText>
        </div>
      ) : (
        <IonList>
          {data.map((event) => (
            <EventsListEntry event={event} />
          ))}
        </IonList>
      )}
    </>
  );
};

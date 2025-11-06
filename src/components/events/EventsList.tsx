import { IonList, IonText } from "@ionic/react";
import { EventsListEntry } from "./EventsListEntry";
import { Event } from "../../network/pocketbase/pocketbase";

type EventsListProps = {
  data: Event[];
};

export const EventsList: React.FC<EventsListProps> = ({ data }) => {
  return (
    <>
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

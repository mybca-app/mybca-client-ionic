import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonList,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { Event } from "../../network/pocketbase/pocketbase";
import { EventsListEntry } from "../events/EventsListEntry";

type EventsCardProps = {
  eventData: Event[];
  isLoading: boolean;
  error: Error | null;
};

export const EventsCard: React.FC<EventsCardProps> = ({
  eventData,
  isLoading,
  error,
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Upcoming events</IonCardTitle>
      </IonCardHeader>

      {isLoading && (
        <div className="ion-text-center ion-padding">
          <IonSpinner />
          <IonText color="medium">
            <p>Loading events...</p>
          </IonText>
        </div>
      )}

      {error && (
        <div className="ion-text-center ion-padding">
          <IonText color="danger">
            <p>Failed to load events. Please try again later.</p>
          </IonText>
        </div>
      )}

      {eventData && !isLoading && !error && (
        <IonCardContent>
          {eventData.length === 0 ? (
            <IonText>There are no upcoming events.</IonText>
          ) : (
            <IonList inset={false} style={{ background: "transparent" }}>
              {eventData.map((event) => (
                <EventsListEntry event={event} standalone />
              ))}
            </IonList>
          )}
        </IonCardContent>
      )}

      <IonButton fill="clear" routerLink="/events/list">
        Go to events
        <IonIcon icon={arrowForward} slot="end" />
      </IonButton>
    </IonCard>
  );
};

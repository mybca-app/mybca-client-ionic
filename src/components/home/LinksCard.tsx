import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonList,
  IonText,
} from "@ionic/react";
import { components } from "../../network/openapi/v1";
import { Loading } from "../shared/Loading";

type LinksCardProps = {
  linksData: components["schemas"]["LinkDto"][];
  isLoading: boolean;
  error: Error | null;
};

export const LinksCard: React.FC<LinksCardProps> = ({
  linksData,
  isLoading,
  error,
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Quick Links</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {isLoading && <Loading message="Loading quick links..." />}

        {error && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>Failed to load quick links. Please try again later.</p>
            </IonText>
          </div>
        )}

        {linksData && (
          <IonList inset={false} style={{ background: "transparent" }}>
            {linksData.map(({ name, target }) => (
              <IonItem
                key={name}
                className="ion-no-padding"
                href={target}
                target="_blank"
                style={{ "--background": "transparent" }}
              >
                <IonText>{name}</IonText>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonCardContent>
    </IonCard>
  );
};

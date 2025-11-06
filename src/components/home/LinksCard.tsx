import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonList,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { components } from "../../network/openapi/v1";

type LinksCardProps = {
  linksData: components["schemas"]["Link"][];
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
        <IonCardTitle>Quick links</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        {isLoading && (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
            <IonText color="medium">
              <p>Loading quick links...</p>
            </IonText>
          </div>
        )}

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

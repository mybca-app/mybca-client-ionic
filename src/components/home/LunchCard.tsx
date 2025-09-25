import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonText, IonSpinner, IonLabel, IonList, IonItem, IonItemDivider } from "@ionic/react";
import { components } from "../../network/openapi/v1";

type LunchCardProps = {
  lunchData?: components["schemas"]["MenuDay2"];
  isLoading: boolean;
  error: Error | null;
};

// Milk/Condiments; Deli; Sides
const UNWANTED_SECTIONS = [3676, 3088, 3090];

export const LunchCard: React.FC<LunchCardProps> = ({ lunchData, isLoading, error }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Lunch menu</IonCardTitle>
        <IonCardSubtitle>{new Date().toLocaleDateString()}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {isLoading && (
          <div className="ion-text-center ion-padding">
            <IonSpinner name="crescent" />
            <IonText color="medium">
              <p>Loading lunch...</p>
            </IonText>
          </div>
        )}

        {error && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>Failed to load lunch. Please try again later.</p>
            </IonText>
          </div>
        )}

        {lunchData && (
          lunchData.menuItems.length === 0 ? (
            <IonText>There is no lunch today.</IonText>
          ) : (
            <IonList style={{ "background": "transparent" }}>
              {lunchData.menuItems.filter(item => !UNWANTED_SECTIONS.includes(item.stationID)).map((item, index) => {
                if (item.isSectionTitle || item.isStationHeader) {
                  return (
                    <IonItemDivider className="ion-no-padding ion-padding-top" style={{ "--background": "transparent" }}>
                      <IonLabel>{item.text}</IonLabel>
                    </IonItemDivider>
                  );
                } else {
                  const style = item.category !== "entree" && item.category !== "meat"
                    ? { marginLeft: "20px" }
                    : {};

                  return (
                    <IonItem key={index} className="ion-no-padding" style={{ "--background": "transparent" }}>
                      <IonLabel>
                        {item.food.name}
                      </IonLabel>
                    </IonItem>
                  );
                }
              })}
            </IonList>
          )
        )}
      </IonCardContent>
    </IonCard>
  );
};

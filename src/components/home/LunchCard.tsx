import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonText, IonSpinner } from "@ionic/react";
import { components } from "../../network/openapi/v1";

type LunchCardProps = {
  lunchData?: components["schemas"]["MenuDay2"];
  isLoading: boolean;
  error: Error | null;
};

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

        {lunchData && (lunchData.menuItems.length === 0 ? (
          <IonText>There is no lunch today.</IonText>
        ) : (
          lunchData.menuItems.map((item, index) => {
            if (item.isSectionTitle || item.isStationHeader) {
              return (
                <IonText key={index}>
                  <h2></h2>
                </IonText>
              )
            } else {
              const style = item.category !== "entree" && item.category !== "meat"
                ? { marginLeft: "20px" }
                : {};

              return <li key={index} style={style}><IonText>{item.food.name}</IonText></li>
            }
          })
        ))}
      </IonCardContent>
    </IonCard>
  )
}
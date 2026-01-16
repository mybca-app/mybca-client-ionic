import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import { components } from "../../network/openapi/v1";
import { Loading } from "../shared/Loading";
import { arrowForward } from "ionicons/icons";

type LunchCardProps = {
  lunchData?: components["schemas"]["MenuDayDto2"];
  isLoading: boolean;
  error: Error | null;
};

// Milk/Condiments; Deli; Sides
const UNWANTED_SECTIONS = [3676, 3088, 3090];

export const LunchCard: React.FC<LunchCardProps> = ({
  lunchData,
  isLoading,
  error,
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Lunch Menu</IonCardTitle>
        <IonCardSubtitle>{new Date().toLocaleDateString()}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {isLoading && <Loading message="Loading lunch..." />}

        {error && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>Failed to load lunch. Please try again later.</p>
            </IonText>
          </div>
        )}

        {lunchData &&
          (lunchData.menuItems.length === 0 ? (
            <IonText>There is no lunch today.</IonText>
          ) : (
            <IonList style={{ background: "transparent" }}>
              {lunchData.menuItems
                .filter((item) => !UNWANTED_SECTIONS.includes(item.stationID))
                .map((item, index) => {
                  if (item.isSectionTitle || item.isStationHeader) {
                    return (
                      <IonItemDivider
                        className="ion-no-padding ion-padding-top"
                        style={{ "--background": "transparent" }}
                        key={index}
                      >
                        <IonLabel>{item.text}</IonLabel>
                      </IonItemDivider>
                    );
                  } else {
                    const isInsignificantDish =
                      item.category !== "entree" && item.category !== "meat";

                    return (
                      <IonItem
                        key={index}
                        className="ion-no-padding"
                        style={{ "--background": "transparent" }}
                      >
                        <IonLabel color={isInsignificantDish ? "medium" : ""}>
                          {item.food.name}
                        </IonLabel>
                      </IonItem>
                    );
                  }
                })}
            </IonList>
          ))}
      </IonCardContent>

      <IonButton fill="clear" routerLink="/lunch/list">
        More Menus
        <IonIcon icon={arrowForward} slot="end" />
      </IonButton>
    </IonCard>
  );
};

import { IonItem, IonItemDivider, IonLabel, IonList, IonText } from "@ionic/react";
import { components } from "../../network/openapi/v1";

type LunchListProps = {
  data: components["schemas"]["MenuDayDto2"];
};

// Milk/Condiments; Deli; Sides
const UNWANTED_SECTIONS = [3676, 3088, 3090];

export const LunchList: React.FC<LunchListProps> = ({ data }) => {
  return (
    <>
      {data &&
        (data.menuItems.length === 0 ? (
          <IonItem>
            <IonLabel>There is no lunch today.</IonLabel>
          </IonItem>
        ) : (
          <>
            {data.menuItems
              .filter((item) => !UNWANTED_SECTIONS.includes(item.stationID))
              .map((item, index) => {
                if (item.isSectionTitle || item.isStationHeader) {
                  return (
                    <IonItemDivider
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
                    >
                      <IonLabel color={isInsignificantDish ? "medium" : ""}>
                        {item.food.name}
                      </IonLabel>
                    </IonItem>
                  );
                }
              })}
          </>
        ))}
    </>
  );
};

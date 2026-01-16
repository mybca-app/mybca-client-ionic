import { IonItem, IonItemDivider, IonLabel, IonThumbnail } from "@ionic/react";
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
                      <IonLabel>
                        {item.text}
                      </IonLabel>
                    </IonItemDivider>
                  );
                } else {
                  const isInsignificantDish =
                    item.category !== "entree" && item.category !== "meat";

                  return (
                    <IonItem
                      key={index}
                    >
                      {item.food.imageUrl && (
                        <IonThumbnail slot="start">
                          <img src={item.food.imageUrl} alt={item.food.name ?? ""} />
                        </IonThumbnail>
                      )}
                      <IonLabel color={isInsignificantDish ? "medium" : ""}>
                        <h2>
                          {item.food.name}
                        </h2>
                        {item.food.description && <p>{item.food.description}</p>}
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

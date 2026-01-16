import { IonButton, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonModal, IonText, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { components } from "../../network/openapi/v1";
import { useState } from "react";

type LunchListProps = {
  data: components["schemas"]["MenuDayDto2"];
};

type NutritionItemProps = {
  name: string;
  value: number | null;
  unit?: string;
}

const NutritionItem: React.FC<NutritionItemProps> = ({ name, value, unit }) => {
  if (value === null || value === undefined)
    return <></>;

  return (
    <IonItem style={{ "--background": "transparent" }} className="ion-no-padding">
      <IonLabel>
        {name}
      </IonLabel>
      <IonLabel slot="end">
        {value.toString() + (unit ? " " + unit : "")}
      </IonLabel>
    </IonItem>
  );
}

// Milk/Condiments; Deli; Sides
const UNWANTED_SECTIONS = [3676, 3088, 3090];

export const LunchList: React.FC<LunchListProps> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<components["schemas"]["FoodItemDto"] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (item: components["schemas"]["FoodItemDto"]) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

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
                      button
                      onClick={() => openModal(item.food)}
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
      <IonModal
        isOpen={isOpen}
        onDidDismiss={closeModal}
        initialBreakpoint={0.75}
        breakpoints={[0, 0.75]}
        expandToScroll={false}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>{selectedItem?.name}</IonTitle>
            <IonButton onClick={closeModal} slot="end" fill="clear">
              Close
            </IonButton>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {selectedItem?.imageUrl && <img src={selectedItem.imageUrl} alt={selectedItem.name ?? ""} />}
          {selectedItem?.description && (
            <>
              <IonText>
                <h3>Description</h3>
              </IonText>
              <p>{selectedItem?.description}</p>
              {selectedItem?.nutritionInfo && (
                <>
                  <IonText>
                    <h3>Nutrition Info</h3>
                  </IonText>
                  <IonList inset={false} style={{ background: "transparent" }}>
                    <NutritionItem name="Calories" value={selectedItem.nutritionInfo.calories} />
                    <NutritionItem name="Saturated Fat" value={selectedItem.nutritionInfo.saturatedFat} unit="g" />
                    <NutritionItem name="Trans Fat" value={selectedItem.nutritionInfo.transFat} unit="g" />
                    <NutritionItem name="Carbohydrates" value={selectedItem.nutritionInfo.carbs} unit="g" />
                    <NutritionItem name="Sugar" value={selectedItem.nutritionInfo.sugar} unit="g" />
                    <NutritionItem name="Added Sugar" value={selectedItem.nutritionInfo.addedSugar} unit="g" />
                    <NutritionItem name="Protein" value={selectedItem.nutritionInfo.protein} unit="g" />
                    <NutritionItem name="Fiber" value={selectedItem.nutritionInfo.fiber} unit="g" />
                    <NutritionItem name="Sodium" value={selectedItem.nutritionInfo.sodium} unit="mg" />
                    <NutritionItem name="Iron" value={selectedItem.nutritionInfo.iron} unit="mg" />
                    <NutritionItem name="Calcium" value={selectedItem.nutritionInfo.calcium} unit="mg" />
                    <NutritionItem name="Vitamin C" value={selectedItem.nutritionInfo.vitaminC} unit="mg" />
                    <NutritionItem name="Vitamin A" value={selectedItem.nutritionInfo.vitaminA} unit="iu" />
                    <NutritionItem name="Vitamin D" value={selectedItem.nutritionInfo.vitaminD} unit="mg" />
                  </IonList>
                </>
              )}
            </>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

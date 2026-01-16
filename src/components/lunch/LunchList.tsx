import { IonButton, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonModal, IonText, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { components } from "../../network/openapi/v1";
import { useState } from "react";

type LunchListProps = {
  data: components["schemas"]["MenuDayDto2"];
};

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
            </>
          )}
        </IonContent>
      </IonModal>
    </>
  );
};

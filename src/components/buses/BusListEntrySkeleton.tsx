import { IonButton, IonChip, IonIcon, IonItem, IonLabel, IonSkeletonText } from "@ionic/react";
import { informationCircleOutline, star, starOutline } from "ionicons/icons";

export const BusListEntrySkeleton: React.FC = () => {
  return (
    <IonItem
      style={{ "--background": "transparent" }}
    >

      <IonButton
        slot="start"
        color={"medium"}
        fill="clear"
        size="default"
        disabled
      >
        <IonIcon slot="icon-only" icon={starOutline} />
      </IonButton>

      <IonLabel>
        <h2><IonSkeletonText animated style={{ width: "25ch" }} /></h2>
        <p><IonSkeletonText animated style={{ width: "12ch" }} /></p>
      </IonLabel>
      <IonSkeletonText animated style={{ width: "3ch" }} slot="end" className="ion-margin-end" />
      <IonButton
        slot="end"
        color="medium"
        fill="clear"
        size="default"
        disabled
      >
        <IonIcon slot="icon-only" icon={informationCircleOutline} />
      </IonButton>
    </IonItem>
  );
};

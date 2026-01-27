import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { components } from "../../../network/openapi/v1";
import { GreetingText } from "./GreetingText";
import { arrowForward } from "ionicons/icons";
import logo from "/logo.svg";

export type HomeHeaderProps = {
  now?: Date;
  busPositions: Record<string, string>;
  lunchDay: components["schemas"]["MenuDayDto"] | null;
};

export const HomeHeader: React.FC<HomeHeaderProps> = ({ now = new Date(), busPositions, lunchDay }) => {
  return (
    <div className="ion-padding" style={{
      backgroundImage: "url(/main-screen-header-bg.webp)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      boxShadow: "inset 0 0 0 9999px rgba(0,0,0,0.8)",
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingTop: "calc(env(safe-area-inset-top) + 16px)"
    }}>
      <div className="ion-margin-top ion-align-self-center">
        <img src={logo} alt="myBCA logo" width="64px" />
      </div>
      <div>
        <GreetingText now={now} busPositions={busPositions} lunchDay={lunchDay} />
        {now.getHours() <= 14 ? (
          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol size="6">
                <IonButton fill="clear" routerLink="/lunch/list" className="ion-no-padding" style={{ color: "rgb(77, 141, 255)" }}>
                  Lunch
                  <IonIcon icon={arrowForward} slot="end" />
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton fill="clear" routerLink="/news/list" className="ion-no-padding" style={{ color: "rgb(77, 141, 255)" }}>
                  News
                  <IonIcon icon={arrowForward} slot="end" />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol size="6">
                <IonButton fill="clear" routerLink="/buses/list" className="ion-no-padding" style={{ color: "rgb(77, 141, 255)" }}>
                  All Buses
                  <IonIcon icon={arrowForward} slot="end" />
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </div>
    </div>
  )
}
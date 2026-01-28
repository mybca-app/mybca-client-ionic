import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { bus, calendar, fastFood, hammer, newspaper } from "ionicons/icons";

export const MenuPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Menu</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonListHeader>
            <IonLabel>Sign In</IonLabel>
          </IonListHeader>
          <IonItem disabled>
            <IonLabel>Sign in will be available in a future version of myBCA.</IonLabel>
          </IonItem>
        </IonList>

        <IonList>
          <IonListHeader>
            <IonLabel>Features</IonLabel>
          </IonListHeader>
          <IonItem routerLink="/buses/list">
            <IonIcon color="warning" slot="start" icon={bus} />
            <IonLabel>Buses</IonLabel>
          </IonItem>
          <IonItem routerLink="/events/list">
            <IonIcon color="danger" slot="start" icon={calendar} />
            <IonLabel>Events</IonLabel>
          </IonItem>
          <IonItem routerLink="/lunch/list">
            <IonIcon color="success" slot="start" icon={fastFood} />
            <IonLabel>Lunch</IonLabel>
          </IonItem>
          
          <IonItem routerLink="/news/list">
            <IonIcon color="primary" slot="start" icon={newspaper} />
            <IonLabel>News</IonLabel>
          </IonItem>
        </IonList>

        <IonList>
          <IonListHeader>
            <IonLabel>About</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Developer</IonLabel>
            <IonLabel slot="end" color="medium">Thomas Torossian</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>License</IonLabel>
            <IonLabel slot="end" color="medium">AGPL-3.0-or-later</IonLabel>
          </IonItem>
          <IonItem href="https://github.com/mybca-app" target="_blank">
            <IonLabel>GitHub</IonLabel>
            <IonLabel slot="end" color="medium">mybca-app</IonLabel>
          </IonItem>
          <IonItem href="https://instagram.com/usemybca" target="_blank">
            <IonLabel>Instagram</IonLabel>
            <IonLabel slot="end" color="medium">@usemybca</IonLabel>
          </IonItem>
          <IonItem href="https://mybca.link/docs/privacy" target="_blank">
            <IonLabel>Privacy Policy</IonLabel>
          </IonItem>
          <IonItem href="https://commons.wikimedia.org/wiki/File:Bergen_County_Academies_main_entrance.jpg" target="_blank">
            <IonLabel color="medium">
              Background image on main page: "Bergen County Academies main entrance"
              by BappleBusiness on Wikimedia Commons, licensed under CC BY-SA 4.0
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { bus, calendar, home } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import { BusListPage } from "./pages/BusListPage";
import { HomePage } from "./pages/HomePage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BusDetailPage } from "./pages/BusDetailPage";
import { EventsPage } from "./pages/EventsPage";
import { PermissionsBootstrap } from "./PermissionsBootstrap";
import { SplashScreen } from "@capacitor/splash-screen";

setupIonicReact();

(async () => {
  await SplashScreen.show({
    showDuration: 2000,
    autoHide: true,
  });
})();

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <PermissionsBootstrap />

      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <HomePage />
            </Route>
            <Route exact path="/buses/list" component={BusListPage} />
            <Route exact path="/buses/:bus/detail" component={BusDetailPage} />

            <Route exact path="/events/list">
              <EventsPage />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon aria-hidden="true" icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="buslist" href="/buses/list">
              <IonIcon aria-hidden="true" icon={bus} />
              <IonLabel>Buses</IonLabel>
            </IonTabButton>
            <IonTabButton tab="events" href="/events/list">
              <IonIcon aria-hidden="true" icon={calendar} />
              <IonLabel>Events</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </QueryClientProvider>
);

export default App;

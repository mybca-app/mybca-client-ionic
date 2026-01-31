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
import { bus, calendar, fastFood, home, menu, newspaper } from "ionicons/icons";
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

import { SplashScreen } from "@capacitor/splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BusDetailPage } from "./pages/BusDetailPage";
import { EventsPage } from "./pages/EventsPage";
import { MenuPage } from "./pages/MenuPage";
import { NewsPage } from "./pages/NewsPage";
import { PermissionsBootstrap } from "./PermissionsBootstrap";
import { LunchPage } from "./pages/LunchPage";

setupIonicReact();

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

            <Route exact path="/news/list" component={NewsPage} />

            <Route exact path="/events/list">
              <EventsPage />
            </Route>

            <Route exact path="/lunch/list" component={LunchPage} />

            <Route exact path="/menu" component={MenuPage} />

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
            <IonTabButton tab="lunch" href="/lunch/list">
              <IonIcon aria-hidden="true" icon={fastFood} />
              <IonLabel>Lunch</IonLabel>
            </IonTabButton>
            <IonTabButton tab="menu" href="/menu">
              <IonIcon aria-hidden="true" icon={menu} />
              <IonLabel>Menu</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </QueryClientProvider>
);

export default App;

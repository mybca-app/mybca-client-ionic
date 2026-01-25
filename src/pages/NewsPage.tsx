import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from "@ionic/react";
import { Loading } from "../components/shared/Loading";
import { $api } from "../network/client";
import { components } from "../network/openapi/v1";
import { NewsList } from "../components/news/NewsList";

export const NewsPage: React.FC = () => {
  const {
    data,
    error,
    isLoading,
    refetch,
  } = $api.useQuery("get", "/api/news/stories");

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>News</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">News</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher
          slot="fixed"
          onIonRefresh={async (event: RefresherCustomEvent) => {
            await refetch();
            event.detail.complete();
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {isLoading && <Loading message="Loading news..." />}

        {error && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>Failed to load news.</p>
            </IonText>
          </div>
        )}

        {data && <NewsList data={data.data as unknown[] as components["schemas"]["NewsStoryDto2"][]} />}
      </IonContent>
    </IonPage>
  );
};

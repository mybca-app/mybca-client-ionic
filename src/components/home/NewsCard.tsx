import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonText
} from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { components } from "../../network/openapi/v1";
import { Loading } from "../shared/Loading";

type NewsCardProps = {
  newsData: components["schemas"]["NewsStory"];
  isLoading: boolean;
  error: Error | null;
};

export const NewsCard: React.FC<NewsCardProps> = ({
  newsData,
  isLoading,
  error,
}) => {
  return (
    <IonCard>
      {newsData && newsData.imageLink && (
        <img src={newsData.imageLink} style={{
          aspectRatio: "16 / 9",
        }} />
      )}
      <IonCardHeader>
        <IonCardTitle>{newsData ? newsData.title : "In the news"}</IonCardTitle>
        {newsData && <IonCardSubtitle>{new Date(newsData.createdAt).toLocaleDateString()}</IonCardSubtitle>}
      </IonCardHeader>
      <IonCardContent>
        {isLoading && <Loading message="Loading news..." />}

        {error && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>Failed to load news. Please try again later.</p>
            </IonText>
          </div>
        )}

        {newsData && (
          <IonText>In the news - provided by <i>Academy Chronicle</i></IonText>
        )}
      </IonCardContent>

      {newsData && (
        <IonButton fill="clear" href={newsData.link} target="_blank">
          Read more
          <IonIcon icon={arrowForward} slot="end" />
        </IonButton>
      )}
    </IonCard>
  );
};

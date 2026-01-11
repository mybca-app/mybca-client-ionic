import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { ArrivalList } from "../components/buses/ArrivalList";
import { Loading } from "../components/shared/Loading";
import { $api } from "../network/client";
import DOMPurify from "dompurify";
import { decodeHtml } from "../helpers/escape";

interface NewsDetailParams {
  storyId: string;
}

export const NewsDetailPage: React.FC = () => {
  const { storyId: storyIdRaw } = useParams<NewsDetailParams>();
  const idAsInt = Number.parseInt(storyIdRaw);

  const { data, error, isLoading } = $api.useQuery(
    "get",
    "/api/News/Stories/{id}",
    { params: { path: { id: idAsInt } } },
  );

  const sanitized = DOMPurify.sanitize(data?.contentHtml ?? "");

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>News Reader</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoading && <Loading message="Loading article..." />}

        {error && (
          <div className="ion-text-center ion-padding">
            <IonText color="danger">
              <p>Failed to load article.</p>
            </IonText>
          </div>
        )}

        {data && (
          <>
            <header className="ion-padding">
              {data.imageLink && <img src={data.imageLink} alt={`Featured image for article "${data.title}"`} />}
              <IonText>
                <h1>{decodeHtml(data.title)}</h1>
              </IonText>
              <IonText color="medium">
                <p>
                  {new Date(data.createdAt).toLocaleDateString()} • &#32;
                  <a href={data.link} target="_blank" rel="noopener noreferrer">read online</a>
                </p>
              </IonText>
            </header>
            <div className="ion-padding-horizontal">
              <div dangerouslySetInnerHTML={{ __html: sanitized }} style={{
                lineHeight: "1.5"
              }} />
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

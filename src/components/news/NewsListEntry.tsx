import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { decodeHtml } from "../../helpers/escape";

type NewsListEntryProps = {
  storyId: number;
  title: string;
  imageLink: string | null;
  createdAt: Date;
};

export const NewsListEntry: React.FC<NewsListEntryProps> = ({ storyId, title, imageLink, createdAt }) => {
  return (
    <IonItem
      style={{ "--background": "transparent" }}
      routerLink={`/news/${storyId}/detail`}
    >
      {imageLink && (
        <IonThumbnail slot="start">
          <img src={imageLink} alt={`Featured image for article "${title}"`} />
        </IonThumbnail>
      )}
      <IonLabel>
        <h2>{decodeHtml(title)}</h2>
        <p>{createdAt.toLocaleDateString()}</p>
      </IonLabel>
    </IonItem>
  );
}
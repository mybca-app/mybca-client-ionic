import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";

type NewsListEntryProps = {
  storyId: number;
  title: string;
  imageLink: string | null;
  createdAt: Date;
};

function decodeHtml(input: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = input;
  return txt.value;
}

export const NewsListEntry: React.FC<NewsListEntryProps> = ({ storyId, title, imageLink, createdAt }) => {
  return (
    <IonItem
      style={{ "--background": "transparent" }}
    >
      {imageLink && (
        <IonThumbnail slot="start">
          <img src={imageLink} alt={`Featured image for article "${title}"`} width="300" />
        </IonThumbnail>
      )}
      <IonLabel>
        <h2>{decodeHtml(title)}</h2>
        <p>{createdAt.toLocaleDateString()}</p>
      </IonLabel>
    </IonItem>
  );
}
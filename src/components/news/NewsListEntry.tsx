import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { decodeHtml } from "../../helpers/escape";
import { DefaultSystemBrowserOptions, InAppBrowser } from "@capacitor/inappbrowser";
import { Capacitor } from "@capacitor/core";

type NewsListEntryProps = {
  title: string;
  imageLink: string | null;
  createdAt: Date;
  storyLink: string;
};

export const NewsListEntry: React.FC<NewsListEntryProps> = ({ storyLink, title, imageLink, createdAt }) => {
  return (
    <IonItem
      style={{ "--background": "transparent" }}
      button
      onClick={async () => {
        if (Capacitor.isNativePlatform()) {
          await InAppBrowser.openInSystemBrowser({
            url: storyLink,
            options: DefaultSystemBrowserOptions,
          });
        } else {
          window.open(storyLink, "_blank")?.focus();
        }
      }}
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
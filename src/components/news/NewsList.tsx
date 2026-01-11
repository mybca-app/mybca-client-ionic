import { IonList, IonText } from "@ionic/react";
import { components } from "../../network/openapi/v1";
import { NewsListEntry } from "./NewsListEntry";

type NewsListProps = {
  data: components["schemas"]["NewsStoryDto2"][]
};

export const NewsList: React.FC<NewsListProps> = ({ data }) => {
  return (
    <>
      <div className="ion-padding">
        <IonText>
          News is provided by our school newspaper, the &#32;
          <a
            href="https://academychronicle.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Academy Chronicle
          </a>
          .
        </IonText>
      </div>
      {data.length === 0 ? (
        <div className="ion-text-center ion-padding">
          <IonText>There are no recent news stories.</IonText>
        </div>
      ) : (
        <IonList>
          {data.map((story) => (
            <NewsListEntry key={story.id} imageLink={story.imageLink} title={story.title} createdAt={new Date(story.createdAt)} storyLink={story.link} />
          ))}
        </IonList>
      )}
    </>
  );
};

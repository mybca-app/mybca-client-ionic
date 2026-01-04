import { IonSpinner, IonText } from "@ionic/react";

type LoadingProps = {
  message: string;
};

export const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="ion-text-center ion-padding">
      <IonSpinner />
      <IonText color="medium">
        <p>{message}</p>
      </IonText>
    </div>
  );
};

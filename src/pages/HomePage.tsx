import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { $api } from '../network/network';

const LunchCard: React.FC = () => {
  const { data, error, isLoading, refetch } = $api.useQuery("get", "/api/lunch/Day");

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Lunch menu</IonCardTitle>
        <IonCardSubtitle>{new Date().toLocaleDateString()}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {data?.data?.menuItems.length === 0 ? (
          <IonText>There is no lunch today.</IonText>
        ) : (
          data?.data?.menuItems.map((item, index) => {
            if (item.isSectionTitle || item.isStationHeader) {
              return (
                <IonText key={index}>
                  <h2></h2>
                </IonText>
              )
            } else {
              const style = item.category !== "entree" && item.category !== "meat"
                ? { marginLeft: "20px" }
                : {};

              return <li key={index} style={style}><IonText>{item.food.name}</IonText></li>
            }
          })
        )}
      </IonCardContent>
    </IonCard>
  )
}

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>myBCA</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">myBCA</IonTitle>
          </IonToolbar>
        </IonHeader>
        <LunchCard />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

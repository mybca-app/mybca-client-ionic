import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { $api } from '../network/client';
import { arrowForward } from 'ionicons/icons';
import { Preferences } from '@capacitor/preferences';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FAVORITE_BUS_PREFERENCES_KEY } from '../storage/favorite_bus';
import { BusListEntry } from '../components/buses/BusListEntry';

const BusCard: React.FC = () => {
  const { data, error, isLoading, refetch } = $api.useQuery("get", "/api/bus/List");
  const [starredBuses, setStarredBuses] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      const { value } = await Preferences.get({ key: FAVORITE_BUS_PREFERENCES_KEY });
      if (value) {
        setStarredBuses(JSON.parse(value));
      }
    })();
  }, []);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Starred buses</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        {starredBuses.length === 0 ? (
          <IonText>
            You haven't starred any buses yet. Star your favorite buses on the <Link to="/buses/list">Buses</Link>
            &nbsp;page to get quick access to them when you open the myBCA app.
          </IonText>
        ) : (
          <IonList inset={false} style={{ "background": "transparent" }}>
            {Object.keys(data?.data || {}).filter(k => starredBuses.includes(k)).map(town => (
              <BusListEntry
                town={town}
                position={data?.data[town] ?? null}
                standalone
              />
            ))}
          </IonList>
        )}
      </IonCardContent>

      <IonButton fill="clear" routerLink="/buses/list">
        Go to buses
        <IonIcon icon={arrowForward} slot="end" />
      </IonButton>
    </IonCard>
  )
}

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
        <BusCard />
        <LunchCard />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

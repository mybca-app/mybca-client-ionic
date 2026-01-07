import { IonLabel, IonList, IonListHeader } from "@ionic/react";
import { components } from "../../network/openapi/v1";
import { ArrivalListEntry } from "./ArrivalListEntry";

type ArrivalListProps = {
  data: components["schemas"]["BusArrival"][];
};

export const ArrivalList: React.FC<ArrivalListProps> = ({ data }) => {
  return (
    <>
      <IonList>
        <IonListHeader>
          <IonLabel>Arrival history</IonLabel>
        </IonListHeader>
        {data.map((arrival) => {
          const arrivalText = arrival.arrivalTime ?? "";
          return (
            <ArrivalListEntry
              town={arrival.busName ?? ""}
              position={arrival.busPosition ?? ""}
              arrivalTime={new Date(arrivalText.endsWith("Z") ? arrivalText : arrivalText + "Z")}
            />
          )
        })}
      </IonList>
    </>
  );
};

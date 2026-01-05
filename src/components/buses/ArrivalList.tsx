import { IonLabel, IonList, IonListHeader } from "@ionic/react";
import { components } from "../../network/openapi/v1";
import { ArrivalListEntry } from "./ArrivalListEntry";
import { utcDateToLocal } from "../../helpers/dateFormat";

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
        {data.map((arrival) => (
          <ArrivalListEntry
            town={arrival.busName ?? ""}
            position={arrival.busPosition ?? ""}
            arrivalTime={utcDateToLocal(new Date(arrival.arrivalTime ?? ""))}
          />
        ))}
      </IonList>
    </>
  );
};

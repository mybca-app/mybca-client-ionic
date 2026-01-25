import { IonText } from "@ionic/react";
import { getTimeGreeting } from "../../../helpers/dateFormat";
import { components } from "../../../network/openapi/v1";

export type GreetingTextProps = {
  now?: Date;
  busPositions: Record<string, string>;
  lunchDay: components["schemas"]["MenuDayDto"] | null;
};

type TimeGreetingTextProps = {
  now?: Date;
}

type LunchInfoTextProps = {
  lunchDay: components["schemas"]["MenuDayDto"] | null;
}

type BusInfoTextProps = {
  busPositions: Record<string, string>;
}

const TimeGreetingText: React.FC<TimeGreetingTextProps> = ({ now = new Date() }) => {
  return (
    <>
      👋 {getTimeGreeting(now)}.
    </>
  );
}

const LunchInfoText: React.FC<LunchInfoTextProps> = ({ lunchDay }) => {
  if (!lunchDay || lunchDay.menuItems.length === 0) {
    return (
      <>
        There's no lunch today.&#160;
      </>
    )
  }

  const createStationFoodNames = lunchDay.menuItems
    .filter(i => !i.isSectionTitle && !i.isStationHeader && i.food)
    .filter(i => i.stationID === 8671) // Create
    .map(i => i.food.name);
  const cLen = createStationFoodNames.length;

  if (cLen === 0) {
    return <></>;
  }

  return (
    <>
      Lunch includes
      <IonText color="success">&#160;{createStationFoodNames[0]}&#160;</IonText>
      {cLen > 1 ? `and ${cLen - 1} other item${cLen - 1 == 1 ? "" : "s"}.` : "."}&#160;
    </>
  )
}

const BusInfoText: React.FC<BusInfoTextProps> = ({ busPositions }) => {
  if (Object.keys(busPositions).length === 0) {
    return <>You don't have any starred buses.&#160;</>;
  }

  return (
    <>
      {Object.entries(busPositions).slice(0, 2).map(([k, v]) =>
        v ? (
          <>
            {k} is in <IonText color="warning">{v}</IonText>.&#160;
          </>
        ) : (
          <>
            {k} isn't here yet.&#160;
          </>
        ))}
    </>
  );
}

function getMotivation(now: Date = new Date()) {
  if (now.getHours() <= 15) {
    return "Enjoy your day."
  } else {
    return "Have a safe trip home."
  }
}

export const GreetingText: React.FC<GreetingTextProps> = ({ now = new Date(), busPositions, lunchDay }) => {
  return (
    <span style={{ color: "white" }}>
      <h2 style={{ fontWeight: "bold", margin: "0" }}>
        <TimeGreetingText now={now} />
      </h2>
      <h2 style={{ fontWeight: "normal", marginTop: "8px" }}>
        {now.getHours() <= 14 && lunchDay && <LunchInfoText lunchDay={lunchDay} />}
        {now.getHours() >= 15 && <BusInfoText busPositions={busPositions} />}
        {getMotivation(now)}
      </h2>
    </span>
  );
}
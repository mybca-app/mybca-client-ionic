import { IonLabel, IonList, IonSearchbar, IonSegment, IonSegmentButton, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { BusListEntry } from "./BusListEntry";
import { BusListEntrySkeleton } from "./BusListEntrySkeleton";

type BusListProps = {
  data: Record<string, string>;
  favorites: string[];
  onToggleFavorite: (bus: string) => void;
};

export const BusList: React.FC<BusListProps> = ({
  data,
  favorites,
  onToggleFavorite,
}) => {
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState<"all" | "starred" | "arrived" | "missing">("all");

  // sorted list, favorites first
  const sortedKeys = Object.keys(data).sort((a, b) => {
    const aFav = favorites.includes(a);
    const bFav = favorites.includes(b);

    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return a.localeCompare(b);
  });

  const results = sortedKeys.filter((key) =>
    key.toLowerCase().includes(query.toLowerCase())
    && (segment != "starred" || favorites.includes(key))
    && (segment != "arrived" || !!data[key])
    && (segment != "missing" || !data[key])
  );

  const handleInput = (event: CustomEvent) => {
    const value = (event.target as HTMLIonSearchbarElement).value ?? "";
    setQuery(value);
  };

  return (
    <>
      <IonSearchbar onIonInput={handleInput}></IonSearchbar>
      <div style={{ paddingLeft: "11px", paddingRight: "11px", paddingBottom: "11px" }}>
        <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as typeof segment)}>
          <IonSegmentButton value="all">
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="starred">
            <IonLabel>Starred</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="arrived">
            <IonLabel>Arrived</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="missing">
            <IonLabel>Missing</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>
      <IonList>
        {results && results.length > 0 ? results.map((key) => (
          <BusListEntry
            key={key}
            town={key}
            position={data[key]}
            isFavorite={favorites.includes(key)}
            onToggleFavorite={onToggleFavorite}
          />
        )) : (
          new Array(40).fill('').map((_, index) => <BusListEntrySkeleton key={index} />)
        )}
      </IonList>
    </>
  );
};

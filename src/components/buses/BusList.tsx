import { IonList, IonSearchbar } from "@ionic/react";
import { useState } from "react";
import { BusListEntry } from "./BusListEntry";

type BusListProps = {
  data: Record<string, string>;
  favorites: string[];
  onToggleFavorite: (bus: string) => void;
};

export const BusList: React.FC<BusListProps> = ({ data, favorites, onToggleFavorite }) => {
  const [query, setQuery] = useState("");

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
  );

  const handleInput = (event: CustomEvent) => {
    const value = (event.target as HTMLIonSearchbarElement).value ?? "";
    setQuery(value);
  };

  return (
    <>
      <IonSearchbar onIonInput={handleInput}></IonSearchbar>
      <IonList>
        {results.map((key) => (
          <BusListEntry
            town={key}
            position={data[key]}
            isFavorite={favorites.includes(key)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </IonList>
    </>
  );
};
import { Preferences } from "@capacitor/preferences";

const FAVORITE_BUS_PREFERENCES_KEY = "mybca_favorite_bus";

export async function getFavorites(): Promise<string[]> {
  const { value } = await Preferences.get({
    key: FAVORITE_BUS_PREFERENCES_KEY,
  });

  if (value) {
    return JSON.parse(value);
  }

  return [];
}

export async function setFavorites(newFavorites: string[]): Promise<void> {
  await Preferences.set({
    key: FAVORITE_BUS_PREFERENCES_KEY,
    value: JSON.stringify(newFavorites),
  });
}

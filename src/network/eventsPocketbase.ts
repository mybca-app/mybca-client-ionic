import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_EVENT_SERVER_URL);

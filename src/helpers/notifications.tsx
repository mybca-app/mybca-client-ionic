import { FirebaseMessaging } from "@capacitor-firebase/messaging";

export function townToNotificationTopic(town: string): string {
  return "bus-subscribed-" + town.toLowerCase().replace(/[^a-zA-Z0-9-_.~%]/g, "-");
}

export async function areNotificationsEnabled(): Promise<boolean> {
  const status = (await FirebaseMessaging.checkPermissions()).receive;
  return status === "granted";
}
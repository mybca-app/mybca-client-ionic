import { FirebaseMessaging } from "@capacitor-firebase/messaging";

function townToNotificationTopic(town: string): string {
  return (
    "bus-subscribed-" + town.toLowerCase().replace(/[^a-zA-Z0-9-_.~%]/g, "-")
  );
}

export async function areNotificationsEnabled(): Promise<boolean> {
  const status = (await FirebaseMessaging.checkPermissions()).receive;
  return status === "granted";
}

export async function subscribeToBus(bus: string) {
  const topic = townToNotificationTopic(bus);
  await FirebaseMessaging.subscribeToTopic({ topic: topic });
}

export async function unsubscribeFromBus(bus: string) {
  const topic = townToNotificationTopic(bus);
  await FirebaseMessaging.unsubscribeFromTopic({ topic: topic });
}

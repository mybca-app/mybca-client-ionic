import { FirebaseMessaging } from "@capacitor-firebase/messaging";
import { useEffect } from "react";

export const PermissionsBootstrap: React.FC = () => {
  useEffect(() => {
    (async () => {
      const status = (await FirebaseMessaging.checkPermissions()).receive;
      if (status === "prompt") {
        await FirebaseMessaging.requestPermissions();
      }
    })();
  }, []);

  return null;
};

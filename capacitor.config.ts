import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "link.mybca.mobileclient",
  appName: "myBCA",
  webDir: "dist",
  android: {
    adjustMarginsForEdgeToEdge: "auto",
  },
};

export default config;

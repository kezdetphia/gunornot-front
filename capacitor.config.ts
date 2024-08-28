import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "gunornot-front",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.0.226:3000",
    cleartext: true,
  },
};

export default config;

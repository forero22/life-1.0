import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.sofcor.life',
  appName: 'Life',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    cleartext: true
  },
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_launcher_round",
      iconColor: "#488AFF",
      sound: "beep.wav"
    },
    GoogleAuth: {
      scopes: [
        "profile",
        "email"
      ],
      serverClientId: "124018728460-sv8cqhnnmnf0jeqbnd0apqbnu6egkhug.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    },
    TwitterPlugin: {
      consumerKey: "lRgADRSkSaDJ6IrIZ3JAFQhKk",
      consumerSecret: "2YUxBHCprQIs4DpddM9IM51ilSx0y02BDnONl4gVTolCHV5viY"
    },
    PushNotifications: {
      presentationOptions: [
        "badge",
        "sound",
        "alert"
      ]
    },
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "FIT_CENTER",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;

import { ConfigContext, ExpoConfig } from '@expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.anonymous.myproductearth.dev';
  }

  if (IS_PREVIEW) {
    return 'com.anonymous.myproductearth.preview';
  }

  return 'com.anonymous.myproductearth';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'MyProductEarth (Dev)';
  }

  if (IS_PREVIEW) {
    return 'MyProductEarth (Preview)';
  }

  return 'MyProductEarth: Emoji Stickers';
};

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  "name": getAppName(),
  "slug": "my-product-earth",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/images/icon.png",
  "scheme": "myproductearth",
  "userInterfaceStyle": "automatic",
  "newArchEnabled": true,
  "ios": {
    ...config.ios,
    "supportsTablet": true,
    "bundleIdentifier": getUniqueIdentifier(),
    "infoPlist": {
      "ITSAppUsesNonExemptEncryption": false
    }
  },
  "android": {
    ...config.android,
    "adaptiveIcon": {
      "backgroundColor": "#E6F4FE",
      "foregroundImage": "./assets/images/android-icon-foreground.png",
      "backgroundImage": "./assets/images/android-icon-background.png",
      "monochromeImage": "./assets/images/android-icon-monochrome.png"
    },
    "edgeToEdgeEnabled": true,
    "predictiveBackGestureEnabled": false,
    "package": getUniqueIdentifier()
  },
  "web": {
    "output": "static",
    "favicon": "./assets/images/favicon.png",
    "bundler": "metro"
  },
  "plugins": [
    "expo-router",
    [
      "expo-splash-screen",
      {
        "image": "./assets/images/splash-icon.png",
        "imageWidth": 200,
        "resizeMode": "contain",
        "backgroundColor": "#ffffff",
        "dark": {
          "backgroundColor": "#000000"
        }
      }
    ]
  ],
  "experiments": {
    "typedRoutes": true,
    "reactCompiler": true
  },
  "extra": {
    "router": {},
    "eas": {
      "projectId": "b0592af7-f631-4640-b311-da729878980c"
    }
  },
  "owner": "mucahittuneldev"
});

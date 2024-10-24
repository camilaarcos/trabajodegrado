import 'dotenv/config';
export default{
  "expo": {
    "name": "CrimenCraft",
    "slug": "CrimenCraft",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/I1.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/CrimenCraft (1).png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/I1.png",
        "backgroundColor": "#ffffff"
      },
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_MAPS_API_KEY
        }
      }
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    }
  }
}

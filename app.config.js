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
      "image": "./assets/CrimenCraft.png",
      "resizeMode": "contain",
      "backgroundColor": "#E5F4F1",
      
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      package: "com.univalle.crimencraft",
      "adaptiveIcon": {
        "foregroundImage": "./assets/I1.png",
        "backgroundColor": "#E5F4F1"
      },
      "config": {
        "googleMaps": {
          "apiKey": process.env.GOOGLE_MAPS_API_KEY
        }
      }
    },
    extra: {
      eas: {
        projectId: "50d68530-11a8-4cee-9a35-e7cb4a536808"
      },
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID
    }
  }
}

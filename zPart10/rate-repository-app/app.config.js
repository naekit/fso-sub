import 'dotenv/config'

export default{
    name: "rate-repository-app",
    slug: "rate-repository-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    backgroundColor: "#f56c11",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#f56c11"
    },
    updates: {
      "fallbackToCacheTimeout": 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#f56c11"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      env: process.env.ENV,
      server: process.env.URI
    }
}

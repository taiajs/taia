{
  "name": "{{{ name }}}",
  "version": "1.0.0",
  "private": true,
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "android": "expo start --android",
    "eas:build": "eas build -p all --profile preview",
    "eas:login": "eas login",
    "eas:whoami": "eas whoami",
    "ios": "expo start --ios",
    "start": "expo start",
    "start:c": "expo start -c",
    "start:offline": "expo start -offline",
    "test": "jest --watchAll",
    "web": "expo start --web"
  },
  "jest": {
    "preset": "jest-expo"
  },
  "dependencies": {
    "@expo/vector-icons": "^13.0.0",
    "@react-navigation/bottom-tabs": "^6.0.5",
    "@react-navigation/native": "^6.0.2",
    "@react-navigation/native-stack": "^6.1.0",
    "eas-cli": "^3.3.2",
    "expo": "~47.0.12",
    "expo-asset": "~8.7.0",
    "expo-constants": "~14.0.2",
    "expo-font": "~11.0.1",
    "expo-linking": "~3.3.0",
    "expo-splash-screen": "~0.17.5",
    "expo-sqlite": "^11.0.0",
    "expo-status-bar": "~1.4.2",
    "expo-system-ui": "~2.0.1",
    "expo-web-browser": "~12.0.0",
    "native-base": "^3.4.25",
    "react": "18.1.0",
    "react-dom": "18.1.0",
    "react-native": "0.70.5",
    "react-native-safe-area-context": "4.4.1",
    "react-native-screens": "~3.18.0",
    "react-native-svg": "13.4.0",
    "react-native-web": "~0.18.9"
  },
  "devDependencies": {
    "@babel/core": "^7.12.9",
    "@types/react": "~18.0.24",
    "@types/react-native": "~0.70.6",
    "jest": "^26.6.3",
    "jest-expo": "~47.0.1",
    "react-test-renderer": "18.1.0",
    "typescript": "^4.6.3"
  }
}

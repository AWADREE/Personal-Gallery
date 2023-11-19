import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from "react-native";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import store from "./Store/store";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";

export default function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <HomeScreen />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

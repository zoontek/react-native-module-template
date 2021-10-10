import * as React from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import * as module from "./module";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginBottom: 20,
  },
});

export const App = () => {
  React.useEffect(() => {
    const removeListener = module.addListener(
      "timeZoneChange",
      ({ date, value }) => {
        console.warn("New TimeZone", `Detected at ${date}, value: ${value}`);
      },
    );

    return removeListener;
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>initialTimeZone: {module.initialTimeZone}</Text>

      <Button
        title="Get current timeZone"
        onPress={() => {
          module
            .getTimeZone()
            .then((timeZone) => Alert.alert("Current TimeZone", timeZone))
            .catch((error) => console.log(error));
        }}
      />
    </SafeAreaView>
  );
};

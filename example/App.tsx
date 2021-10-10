import * as React from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import * as RNModuleTemplate from "react-native-module-template";

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
    const removeListener = RNModuleTemplate.addListener(
      "timeZoneChange",
      ({ date, value }) => {
        console.log("timeZoneChange", `[${date}]: ${value}`);
      },
    );

    return removeListener;
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.text}>
        initialTimeZone: {RNModuleTemplate.initialTimeZone}
      </Text>

      <Button
        title="Get current timeZone"
        onPress={() => {
          RNModuleTemplate.getTimeZone()
            .then((timeZone) => Alert.alert("Current TimeZone", timeZone))
            .catch((error) => console.log(error));
        }}
      />
    </SafeAreaView>
  );
};

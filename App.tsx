import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "react-native/Libraries/Components/StatusBar/StatusBar";
import Router from "./src/router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {};
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'red'} />
      <View style={styles.root}>
        <Router />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
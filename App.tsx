/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import X from './src/assets/vectors/logo.svg'
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import Router from 'router';
import {colors} from './src/theme/colors';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <View style={styles.root}>
        <Router />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.primary.base,
  },
});

export default gestureHandlerRootHOC(App);

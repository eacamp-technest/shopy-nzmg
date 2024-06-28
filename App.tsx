/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet, View} from 'react-native';
import Router from 'router';
import {colors} from './src/theme/colors';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Toast} from 'components/Toast';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Toast />
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

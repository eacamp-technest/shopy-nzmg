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
import {colors} from './src/theme/colors';
import {Button} from 'components/Buttons';
import {Switch} from './src/components/Switch';
import {Navbar} from 'components/Navbar';
import {TextLink} from 'components/TextLinks';

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
      <StatusBar barStyle={'light-content'} />
      <View style={styles.root}></View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;

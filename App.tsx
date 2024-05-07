/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {View, Text} from 'react-native';
import React from 'react';
import {Switch} from './src/components/Switch';

const App = () => {
  return (
    <View>
      <Switch
        size={'material'}
        circleSize={'materialCircle'}
        rightCircles={'rightMaterialCircle'}
      />
    </View>
  );
};

export default App;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigation.types';
import { Routes } from 'router/routes';
import { colors } from 'theme/colors';
import { normalize } from 'theme/metrics';
import { Navbar } from 'components/Navbar';

export const TestScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.test>
> = ({ navigation }) => {

  return (
    <View style={styles.root}>
      <Navbar
        type="standard"
        title="SHOPPAY"
        left={require('./assets/vectors/menu.svg')}
        leftActionType="icon"
        onLeftPress={navigation.goBack}
        right={require('./assets/vectors/shopping-bag.svg')}
        rightActionType='icon'
      />
      {/* search input  */}
      {/* All stores / In-Store */}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

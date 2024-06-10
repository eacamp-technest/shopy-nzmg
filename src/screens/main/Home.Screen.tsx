import { View, Text, StyleSheet, StatusBar, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { Navbar } from 'components/Navbar';
import { colors } from 'theme/colors';
import { normalize } from 'theme/metrics';
import { NavigationParamList } from 'types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from 'router/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SearchBar } from 'components/SearchBar';


export const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>> = ({ navigation }) => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaProvider style={styles.root}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={colors.bdazzleBlue.darkest}
          />
          <View style={styles.up}>
            <Navbar
              mode='dark'
              title="SHOPPAY"
              titleColor="white"
              textStyle={{ color: colors.white }}
              left={require('../../assets/vectors/menu.svg')}
              leftActionType="icon"
              onLeftPress={navigation.goBack} //  it's temporarily added . change it 
              right={require('../../assets/vectors/shopping-bag.svg')}
              onRightPress={() => console.log('shopping bag pressed')}
              rightActionType='icon'
            />

            <SearchBar
              placeholder="Search brand products.."
              leftIcon={{ source: require('../../assets/vectors/search.svg'), color: '#000', width: 24, height: 24 }}
            // value={searchValue}
            // setValue={setSearchValue}
            />
          </View>
          <View style={styles.categories}>
            <Navbar
              left={'CATEGORIES'}
              textStyle={{ color: colors.ink.darkest }}
              leftActionType="text"
              rightActionType="text"
              right={'See All'}
            />
          </View>

        </SafeAreaProvider>
      </TouchableWithoutFeedback>

    );
  };

const styles = StyleSheet.create({
  root: {
    flex: 1,


  },
  up: {
    flex: 0.33,
    paddingHorizontal: normalize('horizontal', 24),
    color: colors.white,
    gap: normalize('vertical', 24),
    backgroundColor: colors.bdazzleBlue.darkest,
  },
  categories: {
    paddingHorizontal: normalize('horizontal', 24),

  }
});
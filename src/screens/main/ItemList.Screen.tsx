import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';

export const ItemListScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.itemlist>
> = ({navigation}) => {
  return (
    <View>
      <Text>ItemList</Text>
    </View>
  );
};

import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';

export const ProductDetailScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.productDetail>
> = ({navigation}) => {
  return (
    <View>
      <Text>ProductDetail</Text>
    </View>
  );
};

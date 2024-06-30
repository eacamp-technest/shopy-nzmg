import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';

export const ProfileScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.profile>
> = ({navigation}) => {
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Buttons} from 'components/Buttons';
import {BottomSheet} from 'components/BottomSheet';
import {CommonStyles} from 'theme/common.styles';

export const PopularScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.popular>
> = ({navigation}) => {
  const [status, setStatus] = useState<boolean>(false);

  return (
    <View style={CommonStyles.flexAlignJustifyCenter}>
      <Text>PopularScreen</Text>
      <Buttons text="Open BottomSHeet" onPress={() => setStatus(true)} />
      {status && <BottomSheet setStatus={setStatus} />}
    </View>
  );
};

const styles = StyleSheet.create({});

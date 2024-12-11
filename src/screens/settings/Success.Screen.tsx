import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {TypographyStyles} from 'theme/typography';
import {CommonStyles} from 'theme/common.styles';
import {normalize} from 'theme/metrics';
import {Buttons} from 'components/Buttons';
import {useStatusBar} from 'helpers/useStatusBar';
import {colors} from 'theme/colors';

export const SuccessScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.success>
> = ({navigation}) => {
  useStatusBar('dark-content', colors.white);
  return (
    <View style={styles.root}>
      <Image
        style={styles.image}
        source={require('../../assets/images/success.png')}
      />
      <View style={styles.contain}>
        <Text style={[TypographyStyles.title3, CommonStyles.alginSelfCenter]}>
          order success
        </Text>
        <Text style={[TypographyStyles.RegularNormalRegular, styles.text]}>
          Your pocket will send to your address, thanks for order!
        </Text>
      </View>
      <Buttons
        text="Continue shopping"
        size="block"
        onPress={() => {
          navigation.pop(2);
          navigation.navigate(Routes.search);
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize('horizontal', 24),
    gap: 32,
  },
  image: {
    width: 250,
    height: 250,
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: normalize('horizontal', 4),
  },
  contain: {
    gap: 8,
  },
});

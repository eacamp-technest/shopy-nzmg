import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {TypographyStyles} from 'theme/typography';
import {CommonStyles} from 'theme/common.styles';
import {normalize} from 'theme/metrics';
import {Buttons} from 'components/Buttons';

export const SuccessScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.success>
> = ({navigation}) => {
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
        onPress={() =>
          navigation.navigate(Routes.search, {
            items: [
              'Nike Air Max 270 React',
              'Nike Air Max 270 React ENG',
              'Nike Air Max 97 Utility',
              'Nike Air Vapormax',
            ],
            onItemPress: item => console.log('item pressed', item),
            headerTitle: 'Flowers',
          })
        }
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

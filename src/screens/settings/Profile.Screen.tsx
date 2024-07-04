import {View, Image, StyleSheet, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';
import {FlatList} from 'react-native-gesture-handler';
import {Tables} from 'components/Tables';
import {SvgImage} from 'components/SvgImages';
import {IProfile, PROFILE} from 'constants/settings';

export const ProfileScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.profile>
> = ({navigation}) => {
  return (
    <View>
      <View style={styles.contain}>
        <Navbar
          titleColor={colors.bdazzleBlue.base}
          title="PROFILE"
          leftActionType="icon"
          mode="light"
          onLeftPress={() => navigation.goBack()}
          rootStyle={styles.header}
          left={require('assets/vectors/left.svg')}
        />
        <Image
          style={styles.image}
          source={require('assets/images/Profile.png')}
        />
        <View style={styles.textContain}>
          <Text style={[TypographyStyles.LargeTightBold, styles.text]}>
            Brooklyn Simmons
          </Text>
          <Text style={[TypographyStyles.RegularNoneRegular, styles.text]}>
            brooklyn@nucleus.co
          </Text>
        </View>
      </View>
      <FlatList
        data={PROFILE}
        renderItem={({item}: {item: IProfile}) => (
          <Tables
            Left={<SvgImage color={colors.primary.base} source={item.icon} />}
            onPress={() =>
              item.id === '1'
                ? navigation.navigate(Routes.reset)
                : console.log(item.title)
            }
            title={item.title}
            subTitle={item.subTitle}
            style={styles.table}
            titleStyle={TypographyStyles.RegularTightSemiBold}
            Right={<SvgImage color={colors.sky.dark} source={item.right} />}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  image: {
    width: 120,
    height: 120,
  },
  contain: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: colors.mellowApricot.base,
    marginBottom: 16,
  },
  textContain: {
    gap: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  text: {
    color: colors.bdazzleBlue.base,
  },
  table: {},
});

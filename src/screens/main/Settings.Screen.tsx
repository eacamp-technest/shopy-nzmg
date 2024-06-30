import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {Tables} from 'components/Tables';
import {SvgImage} from 'components/SvgImages';
import {FlatList} from 'react-native-gesture-handler';
import {TypographyStyles} from 'theme/typography';
import {normalize} from 'theme/metrics';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {ISettings, SETTINGS} from 'constants/settings';
import {useCustomStatusBar} from 'helpers/useCustomStatusBar';
import {useNavigation} from '@react-navigation/native';
const navigation = useNavigation();

const renderItem = ({item}: {item: ISettings}) => (
  <View>
    {item.id === '5' ? (
      <View
        style={{
          backgroundColor: colors.sky.lightest,
          height: 12,
          width: '100%',
        }}></View>
    ) : null}
    <Tables
      onPress={() => navigation.navigate(item.onPress)}
      Left={<SvgImage source={item.icon} color={colors.primary.base} />}
      title={item.title}
      titleStyle={TypographyStyles.RegularTightSemiBold}
      style={styles.table}
      Right={
        <SvgImage
          source={require('../../assets/vectors/chevron-right.svg')}
          color={colors.sky.dark}
        />
      }
    />
  </View>
);
export const SettingsScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.settings>
> = ({navigation}) => {
  useCustomStatusBar({backgroundColor: colors.white, barStyle: 'dark-content'});
  return (
    <SafeAreaProvider style={styles.root}>
      <Navbar
        titleColor={colors.ink.base}
        title="Settings"
        leftActionType="icon"
        mode="light"
        onLeftPress={() => navigation.goBack()}
        style={styles.header}
        left={require('../../assets/vectors/left.svg')}
      />
      <FlatList
        data={SETTINGS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 16,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  table: {
    paddingVertical: normalize('vertical', 22),
  },
});

import {View, Image, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IGenderItem, TEENS} from 'constants/discover';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {Tables} from 'components/Tables';
import {SvgImage} from 'components/SvgImages';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';
import {useStatusBar} from 'helpers/useStatusBar';
const renderTeens = ({item}: {item: IGenderItem}) => (
  <Tables
    title={item.title}
    style={styles.table}
    titleStyle={TypographyStyles.RegularTightSemiBold}
    Right={
      <SvgImage
        color={colors.sky.dark}
        source={require('../../assets/vectors/chevron-right.svg')}
      />
    }
  />
);
export const TeensList: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.teensList>
> = ({navigation}) => {
  useStatusBar('dark-content', colors.lavender.base);

  return (
    <View style={styles.root}>
      <View style={styles.contain}>
        <Navbar
          leftActionType="icon"
          onLeftPress={() => navigation.goBack()}
          left={require('../../assets/vectors/left.svg')}
          titleColor={colors.white}
          title={'TEENS'}
          rootStyle={styles.header}
        />
        <Image
          style={styles.image}
          source={require('../../assets/images/Placeholder3.png')}
        />
      </View>
      <FlatList
        data={TEENS}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderTeens}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contain: {
    backgroundColor: colors.lavender.base,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: normalize('height', 282),
  },
  header: {
    position: 'absolute',
    paddingHorizontal: normalize('horizontal', 24),
    zIndex: 1,
  },
  table: {
    paddingVertical: normalize('vertical', 20),
  },
});

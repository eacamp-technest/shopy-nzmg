import {View, Image, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IGenderItem, WOMEN} from 'constants/discover';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {Tables} from 'components/Tables';
import {SvgImage} from 'components/SvgImages';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';
import {useStatusBar} from 'helpers/useStatusBar';

const renderWomen = ({item}: {item: IGenderItem}) => (
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

export const WomenList: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.womenList>
> = ({navigation}) => {
  useStatusBar('dark-content', colors.primary.base);

  return (
    <View style={styles.root}>
      <View style={styles.contain}>
        <Navbar
          leftActionType="icon"
          onLeftPress={() => navigation.goBack()}
          left={require('../../assets/vectors/left.svg')}
          titleColor={colors.white}
          title={'WOMEN'}
          rootStyle={styles.header}
        />
        <Image
          style={styles.image}
          source={require('../../assets/images/Placeholder.png')}
        />
      </View>
      <FlatList
        data={WOMEN}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderWomen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contain: {
    backgroundColor: colors.primary.base,
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

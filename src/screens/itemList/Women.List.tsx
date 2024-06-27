import {View, Image, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WOMEN, discover} from 'constants/discover';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {Tables} from 'components/Tables';
import {SvgImage} from 'components/SvgImages';
import {normalize} from 'theme/metrics';
import {TypographyStyles} from 'theme/typography';

export const WomenList: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.womenList>
> = ({navigation}) => {
  return (
    <View style={styles.root}>
      <View style={styles.contain}>
        <Navbar
          leftActionType="icon"
          onLeftPress={() => navigation.goBack()}
          left={require('../../assets/vectors/left.svg')}
          textStyle={styles.text}
          title={discover[0]?.title}
          rootStyle={styles.header}
        />
        <Image style={styles.image} source={discover[0]?.placeholder} />
      </View>
      <FlatList
        data={WOMEN}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Tables
            title={item.title}
            style={styles.table}
            titleStyle={TypographyStyles.RegularTightSemiBold}
            children={
              <SvgImage
                color={colors.sky.dark}
                source={require('../../assets/vectors/chevron-right.svg')}
              />
            }
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
  contain: {
    backgroundColor: discover[0]?.background,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: normalize('height', 282),
  },
  header: {
    position: 'absolute',
    paddingHorizontal: normalize('horizontal', 24),
  },
  table: {
    paddingVertical: normalize('vertical', 12),
  },
  text: {color: colors.white},
});

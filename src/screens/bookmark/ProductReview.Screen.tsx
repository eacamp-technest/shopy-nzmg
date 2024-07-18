import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useCustomStatusBar} from 'helpers/useCustomStatusBar';
import {colors} from 'theme/colors';
import {Rating} from 'components/Rating';
import {IReview, reviews} from 'data/reviewData';
import {normalize} from 'theme/metrics';
import {Navbar} from 'components/Navbar';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TypographyStyles} from 'theme/typography';
import {Divider} from 'components/Divider';
import {Buttons} from 'components/Buttons';

export const ProductReviewScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.review>
> = ({navigation}) => {
  const renderReview = ({item}: {item: IReview}) => {
    return (
      <View style={styles.review}>
        <View style={styles.reviewContainer}>
          <Image source={item.avatar} />
          <View style={styles.main}>
            <View style={styles.nameDate}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Rating rating={item.rate} />
              </View>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text>{item.comment}</Text>
          </View>
        </View>
        <Divider height="M" />
      </View>
    );
  };

  useCustomStatusBar({backgroundColor: colors.white, barStyle: 'dark-content'});
  return (
    <View style={styles.container}>
      <Navbar
        onLeftPress={() => navigation.goBack()}
        title="PRODUCT REVIEW"
        rightActionType="icon"
        titleColor={colors.ink.base}
        right={require('assets/vectors/sliders.svg')}
        leftActionType="icon"
        mode="light"
        left={require('assets/vectors/left.svg')}
      />
      <View style={styles.reviewList}>
        <FlatList
          numColumns={1}
          renderItem={renderReview}
          data={reviews}
          showsHorizontalScrollIndicator={false}
        />
        <Buttons
          style={styles.button}
          icon={require('../../assets/vectors/edit-2.svg')}
          text="Write a review"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    // backgroundColor: "white"
  },
  button: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    alignSelf: 'center',
    gap: 24,
    marginBottom: 40,
    paddingHorizontal: normalize('horizontal', 32),
  },
  review: {},
  reviewContainer: {
    flexDirection: 'row',
    gap: normalize('horizontal', 16),
    marginVertical: normalize('vertical', 24),
  },
  main: {
    width: '80%',
  },
  reviewList: {
    position: 'relative',
  },
  name: {
    ...TypographyStyles.RegularTightSemiBold,
    color: colors.ink.darkest,
  },
  date: {
    ...TypographyStyles.TinyNormalRegular,
    color: colors.ink.lighter,
  },
  nameDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize('vertical', 16),
  },
  comment: {
    ...TypographyStyles.SmallNormalRegular,
    color: colors.ink.base,
  },
});

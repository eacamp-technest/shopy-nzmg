import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useCustomStatusBar } from 'helpers/useCustomStatusBar';
import { colors } from 'theme/colors';
import { Rating } from 'components/Rating';
import { IReview, reviews } from 'data/reviewData';
import { normalize } from 'theme/metrics';
import { Navbar } from 'components/Navbar';
import { NavigationParamList } from 'types/navigation.types';
import { Routes } from 'router/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TypographyStyles } from 'theme/typography';
import { Divider } from 'components/Divider';
import { Buttons } from 'components/Buttons';
import { BottomSheet } from 'components/BottomSheet';
import { CommonStyles } from 'theme/common.styles';
import { Input } from 'components/Input';
import { launchImageLibrary } from 'react-native-image-picker';

type Props = NativeStackScreenProps<NavigationParamList, Routes.review>;
type TImage = string | NodeRequire | null;
export const ProductReviewScreen: React.FC<Props> = ({ navigation }) => {
  const [status, setStatus] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<TImage>();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [reviewList, setReviewList] = useState<IReview[]>(reviews);

  const renderReview = ({ item }: { item: IReview }) => {
    return (
      <View style={styles.review}>
        <View style={styles.reviewContainer}>
          <Image style={styles.image} source={item.avatar} />
          <View style={styles.main}>
            <View style={styles.nameDate}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Rating fixRating={true} rating={item.rate} />
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

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          setSelectedImage(response.assets?.[0]?.uri || null);
        }
      },
    );
  };

  const addReview = () => {
    const newReview: IReview = {
      avatar: require('assets/images/Profile.png'),
      name: 'You',
      rate: rating,
      date: new Date().toLocaleDateString(),
      comment: comment,
    };

    setReviewList([...reviewList, newReview]);
    setRating(newReview.rate);
    setComment(newReview.comment);
    newReview.avatar;
  };
  const handleOnPress = () => {
    setStatus(false);
    addReview();
  };
  useCustomStatusBar({ backgroundColor: colors.white, barStyle: 'dark-content' });

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
        rootStyle={styles.nav}
        left={require('assets/vectors/left.svg')}
      />
      <View style={styles.reviewList}>
        <FlatList
          numColumns={1}
          renderItem={renderReview}
          data={reviewList}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
        <Buttons
          onPress={() => setStatus(true)}
          style={[styles.button, status && styles.buttonInactive]}
          icon={require('assets/vectors/edit-2.svg')}
          text="Write a review"
        />
      </View>
      {status && (
        <BottomSheet
          size={styles.bottomSheetSize}
          buttonText="Send review"
          title="What is your rate?"
          Children={
            <View style={styles.children}>
              <Rating
                rating={rating}
                onRateChange={(rateLength: number) => setRating(rateLength)}
                size={36}
                style={CommonStyles.alginSelfCenter}
                starStyle={{ gap: 16 }}
              />
              <Text
                style={[
                  TypographyStyles.RegularNormalSemiBold,
                  CommonStyles.textAlignCenter,
                ]}>
                Please share your opinion about the product
              </Text>
              <Input
                inputStyle={{ height: 100 }}
                setValue={setComment}
                multiLine={true}
                value={comment}
              />
              <View style={[CommonStyles.row, styles.imageContainer]}>
                <View style={styles.galeryBorder}>
                  <Buttons
                    style={styles.galeryIcon}
                    iconColor={colors.blue.base}
                    onPress={openGallery}
                    icon={require('assets/vectors/camera.svg')}
                  />
                </View>

                <Image
                  style={styles.defaultImage}
                  source={require('assets/images/ImagesRatio.png')}
                />
              </View>
            </View>
          }
          titleStyle={[CommonStyles.alginSelfCenter, styles.title]}
          onPress={handleOnPress}
          setStatus={setStatus}
          style={styles.bottomSheet}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    paddingHorizontal: 24
  },
  button: {
    position: 'absolute',
    bottom: 30,
    zIndex: 1,
    alignSelf: 'center',
    gap: 24,
    // marginBottom: 40,
    paddingHorizontal: normalize('horizontal', 32),
  },
  buttonInactive: {
    zIndex: 0,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
  review: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  reviewContainer: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: normalize('vertical', 24),
  },
  main: {
    width: '80%',
  },
  reviewList: {
    position: 'relative',
    marginBottom: 100,
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
  bottomSheet: {
    zIndex: 20,
  },
  bottomSheetSize: {
    height: '80%',
  },
  children: {
    gap: 32,
    marginVertical: normalize('vertical', 32),
  },
  galeryBorder: {
    borderWidth: 1,
    borderColor: colors.blue.base,
    paddingHorizontal: normalize('horizontal', 26),
    paddingTop: 16,
    borderRadius: 8,
  },
  galeryIcon: {
    borderRadius: 24,
    backgroundColor: colors.blue.lightest,
  },
  imageContainer: {
    gap: 16,
  },
  defaultImage: {
    width: 104,
    height: 104,
  },
  title: {
    marginTop: 32,
  },
});

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {SvgImage} from 'components/SvgImages';
import {TypographyStyles} from 'theme/typography';
import {Buttons} from 'components/Buttons';
import {Tables} from 'components/Tables';
import {Rating} from 'components/Rating';
import {IProduct} from 'components/ProductCard';
// import React, { useContext, useState } from 'react';
// import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
// import { CartContext } from 'context/CartContextType';

const plusIcon = require('../../assets/vectors/plus.svg');
const minusIcon = require('../../assets/vectors/minus.svg');

export const ProductDetailScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.productDetail>
> = ({navigation, route}) => {
  const item: IProduct = route.params.product;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  //   //     const { addToCart } = useContext<any>(CartContext)
  //   type ProductDetailsRouteProp = RouteProp<RootStackParamList, Routes.productDetail>;
  //   const route = useRoute<ProductDetailsRouteProp>();
  //   const { item } = route.params;
  //   type RootStackParamList = {
  //     productDetails: { item: IProduct };
  //     cart: undefined;
  //   };

  //   // const handleAddToCart = async (product: IProduct) => {
  //   //   const updatedProduct = { ...ProductDetailScreen, size: selectedSize, color: selectedColor }
  //   //   // await addToCart(updatedProduct)
  //   //   navigation.navigate(Routes.cart)
  //   // }

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '36', '38'];
  const colorsArr = [
    colors.sky.lighter,
    colors.red.darkest,
    colors.mellowApricot.base,
    colors.bdazzleBlue.base,
  ];
  const [showAllSizes, setShowAllSizes] = useState(false);
  const sizesToShow = showAllSizes ? sizes : sizes.slice(0, 3);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.main}>
        <Navbar
          type="standard"
          onLeftPress={navigation.goBack}
          leftActionType="icon"
          left={vectors.leftArrow}
          right={vectors.shoppingBag}
          onRightPress={() => console.log('shopping bag pressed')}
          rightActionType="icon"
          rootStyle={styles.nav}
        />
        <Image style={styles.coverImage} source={{uri: item.image}} />
      </View>
      <Text style={styles.category}>{item.category}</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <SvgImage
          fill={colors.red.light}
          width={26}
          height={24}
          source={require('../../assets/vectors/heart.svg')}
        />
      </View>
      <Tables
        onPress={() => navigation.navigate(Routes.review)}
        Left={<Rating rating={4} numberOfRates={24} />}
        Right={<Text style={[styles.price]}>{item.price}</Text>}
      />
      <Tables
        Left={
          <View>
            <Text style={styles.header}>Size</Text>
            <View style={styles.size}>
              {sizesToShow.map((size, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedSize(size)}
                    style={[
                      styles.sizeValueContainer,
                      selectedSize === size && {
                        backgroundColor: colors.blue.base,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.sizeValue,
                        selectedSize === size && {color: colors.white},
                      ]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        }
        Right={
          <TouchableOpacity
            onPress={() => {
              setShowAllSizes(!showAllSizes);
              console.log('pressed');
            }}>
            <SvgImage
              color={colors.ink.base}
              width={24}
              height={24}
              source={showAllSizes ? minusIcon : plusIcon}
            />
          </TouchableOpacity>
        }
      />

      <View style={styles.colorContainer}>
        <Text style={styles.header}>Colors</Text>
        <View style={styles.colors}>
          {colorsArr.map((color, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedColor(color)}
                style={[
                  styles.circleBorder,
                  selectedColor === color && {
                    borderRadius: 24,
                    borderWidth: 2,
                    borderColor: colors.black,
                  },
                ]}>
                <View style={[styles.circle, {backgroundColor: color}]}></View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <Buttons style={styles.button} text="Add to Cart" />
    </View>
  );
};

const vectors = {
  leftArrow: {
    icon: require('assets/vectors/left.svg'),
    color: colors.ink.base,
  },
  shoppingBag: {
    icon: require('assets/vectors/shopping-bag.svg'),
    color: colors.ink.base,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    marginBottom: 32,
  },
  nav: {
    position: 'absolute',
    zIndex: 999,
    paddingHorizontal: normalize('horizontal', 24),
  },
  coverImage: {
    width: '100%',
    resizeMode: 'stretch',
    height: normalize('vertical', 392),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  category: {
    ...TypographyStyles.RegularTightSemiBold,
    color: colors.primary.base,
    paddingHorizontal: 24,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  title: {
    ...TypographyStyles.title3,
    color: colors.ink.base,
  },
  price: {
    ...TypographyStyles.LargeNoneBold,
    color: colors.ink.base,
  },
  size: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  sizeValueContainer: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: colors.sky.lightest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeValue: {
    ...TypographyStyles.SmallTightRegular,
    color: colors.ink.base,
  },
  header: {
    ...TypographyStyles.RegularNoneSemiBold,
    color: colors.ink.base,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  colors: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    marginHorizontal: 24,
  },
  circleBorder: {
    height: 40,
    width: 40,
    marginHorizontal: 5,
  },
  circle: {
    flex: 1,
    borderRadius: 20,
  },
});

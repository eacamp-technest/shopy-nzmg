import React, {useState} from 'react';
import {useCustomStatusBar} from 'helpers/useStatusBar';
import {colors} from 'theme/colors';
import {PriceBar} from 'components/Filters';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TypographyStyles} from 'theme/typography';
import {Navbar} from 'components/Navbar';
import {useNavigation} from '@react-navigation/native';
import {normalize} from 'theme/metrics';
import {Category} from 'components/Category';
import {Buttons} from 'components/Buttons';
import {Divider} from 'components/Divider';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colorArr = [
  colors.sky.lighter,
  colors.sky.base,
  colors.red.darkest,
  colors.mellowApricot.base,
  colors.bdazzleBlue.base,
  colors.sky.dark,
];
const categories: string[] = ['All', 'Shoes', 'Tshirt', 'Kids', 'New'];

export const FilterScreen = () => {
  useCustomStatusBar({backgroundColor: colors.white, barStyle: 'dark-content'});

  const navigation = useNavigation();

  const [selectedMinPrice, setSelectedMinPrice] = useState(50);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(150);

  const handlePriceChange = (priceRange: {min: number; max: number}) => {
    console.log(
      `Price range changed: ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}`,
    );
  };

  const [selectedSize, setSelectedSize] = useState<string | null>('S');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  return (
    <SafeAreaView style={styles.container}>
      <Navbar
        type="standard"
        title="FILTERS"
        titleColor={colors.ink.dark}
        onLeftPress={navigation.goBack}
        leftActionType="icon"
        left={vectors.leftVector}
      />
      <Text style={styles.title}>PRICE RANGE </Text>
      <View style={styles.priceRange}>
        <Text style={styles.priceRangeText}>
          ${selectedMinPrice.toFixed(2)}
        </Text>
        <Text style={styles.priceRangeText}>
          ${selectedMaxPrice.toFixed(2)}
        </Text>
      </View>
      <PriceBar
        minPrice={0}
        maxPrice={200}
        selectedMinPrice={selectedMinPrice}
        setSelectedMinPrice={setSelectedMinPrice}
        selectedMaxPrice={selectedMaxPrice}
        setSelectedMaxPrice={setSelectedMaxPrice}
        onPriceChange={handlePriceChange}
        barColor={colors.sky.light}
        handleColor={colors.primary.base}
        barHeight={2}
      />
      <Divider style={styles.divider} height="M" />
      <Text style={styles.title}>COLORS </Text>
      <View style={styles.colorContainer}>
        {colorArr.map((color, index) => {
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
              <View style={[styles.circle, {backgroundColor: color}]} />
            </TouchableOpacity>
          );
        })}
      </View>
      <Divider style={styles.divider} height="M" />
      <Text style={styles.title}>SIZE RANGE </Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedSize(size)}
              style={[
                styles.sizeValueContainer,
                selectedSize === size && {backgroundColor: colors.blue.base},
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
      <Divider style={styles.divider} height="M" />
      <Text style={styles.title}>CATEGORY </Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({item}) => (
          <Category
            item={item}
            backgroundColor={colors.blue.base}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        horizontal={true}
        keyExtractor={item => item}
      />
      <Buttons text="Apply Filters" />
    </SafeAreaView>
  );
};

const vectors = {
  leftVector: {
    icon: require('../../assets/vectors/chevron-left.svg'),
    color: colors.ink.base,
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  divider: {
    marginLeft: -24,
  },
  title: {
    ...TypographyStyles.title3,
    marginTop: normalize('vertical', 32),
    marginBottom: normalize('vertical', 20),
    color: colors.ink.base,
  },
  priceRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceRangeText: {
    ...TypographyStyles.RegularTightSemiBold,
    marginBottom: 31,
    color: colors.ink.dark,
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 17,
    marginBottom: 32,
  },
  circleBorder: {
    height: 40,
    width: 40,
  },
  circle: {
    flex: 1,
    borderRadius: 20,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 32,
  },
  sizeValueContainer: {
    height: 32,
    width: 52,
    borderRadius: 100,
    backgroundColor: colors.sky.lightest,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sizeValue: {
    ...TypographyStyles.RegularNoneRegular,
    color: colors.ink.base,
  },
});

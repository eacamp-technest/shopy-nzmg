import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {IProduct, ProductCard} from 'components/ProductCard';
import axios from 'axios';
import {colors} from 'theme/colors';
import {Navbar} from 'components/Navbar';
import {TypographyStyles} from 'theme/typography';
import {Routes} from 'router/routes';
import {IBrand, brands} from 'data/brands';
import {normalize} from 'theme/metrics';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {useStatusBar} from 'helpers/useStatusBar';

export const ItemListScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.itemlistScreen>
> = ({navigation, route}) => {
  const {filters, sortCriteria} = route.params || {};
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const EndPoints = 'https://fakestoreapi.com/products';

  const fetchProducts = async () => {
    try {
      const response = await axios.get(EndPoints);
      let filteredProducts = response.data;

      if (filters) {
        if (filters.minPrice !== null) {
          filteredProducts = filteredProducts.filter(
            (product: IProduct) => product.price >= Number(filters.minPrice),
          );
        }
        if (filters.maxPrice !== null) {
          filteredProducts = filteredProducts.filter(
            (product: IProduct) => product.price <= Number(filters.maxPrice),
          );
        }
        if (filters.size) {
          filteredProducts = filteredProducts.filter(
            (product: IProduct) => product.size === filters.size,
          );
        }
        // if (filters.color) {
        //   filteredProducts = filteredProducts.filter((product: IProduct) => product.color === filters.color);
        // }
        if (filters.category) {
          filteredProducts = filteredProducts.filter(
            (product: IProduct) => product.category === filters.category,
          );
        }
      }

      if (sortCriteria === 'lowestPrice') {
        filteredProducts.sort((a: IProduct, b: IProduct) => a.price - b.price);
      } else if (sortCriteria === 'highestPrice') {
        filteredProducts.sort((a: IProduct, b: IProduct) => b.price - a.price);
      }

      setProducts(filteredProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useStatusBar('dark-content', colors.white);

  useEffect(() => {
    fetchProducts();
  }, [filters, sortCriteria]);

  const renderBrand = ({item}: {item: IBrand}) => (
    <View style={styles.brandContainer}>
      <Image style={styles.img} source={item.image} />
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  const renderList = useCallback(
    ({item}: {item: IProduct}) => (
      <ProductCard
        id={item.id}
        size="s"
        title={item.title}
        image={item.image}
        horizontal={true}
        price={item.price}
        onPress={() =>
          navigation.navigate(Routes.productDetail, {product: item})
        }
      />
    ),
    [navigation],
  );

  const getTitle = () => {
    switch (sortCriteria) {
      case 'lowestPrice':
        return 'Sorted by Lowest Price';
      case 'highestPrice':
        return 'Sorted by Highest Price';
      default:
        return 'Products';
    }
  };

  return (
    <View style={styles.container}>
      <Navbar
        mode="light"
        title={getTitle()}
        titleColor={colors.ink.base}
        left={vectors.leftVector}
        leftActionType="icon"
        onLeftPress={navigation.goBack}
        right={vectors.filter}
        onRightPress={() => navigation.navigate(Routes.filters)}
        rightActionType="icon"
      />
      <View>
        <Navbar
          style={{flex: 0.7}}
          left={'BRAND'}
          leftTextStyle={styles.leftStyle}
          leftActionType="text"
          rightActionType="text"
          onRightPress={() => console.log('aa')}
          right={'See All'}
        />

        <View style={styles.brand}>
          <FlatList
            numColumns={brands.length}
            renderItem={renderBrand}
            data={brands}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.ink.base} />
      ) : (
        <View style={styles.products}>
          <FlatList
            data={products}
            renderItem={renderList}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={
              <>
                <Navbar
                  style={{flex: 0.7}}
                  left={'PRODUCT'}
                  leftTextStyle={styles.leftStyle}
                  leftActionType="text"
                  rightActionType="text"
                  onRightPress={() => console.log('aa')}
                  right={'See All'}
                />
              </>
            }
          />
        </View>
      )}
    </View>
  );
};

const vectors = {
  leftVector: {
    icon: require('assets/vectors/left.svg'),
    color: colors.ink.base,
  },
  filter: {
    icon: require('assets/vectors/filter.svg'),
    color: colors.ink.base,
  },
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  leftStyle: {
    ...TypographyStyles.title3,
    color: colors.ink.base,
  },
  brand: {
    marginBottom: normalize('vertical', 26),
    marginTop: normalize('vertical', 10),
  },
  img: {
    height: normalize('width', 70),
    width: normalize('width', 70),
  },
  brandContainer: {
    alignItems: 'center',
    marginRight: normalize('horizontal', 16),
  },
  text: {
    ...TypographyStyles.TinyNoneSemiBold,
    color: colors.ink.base,
    marginTop: normalize('vertical', 12),
  },
  products: {
    marginTop: normalize('vertical', 10),
  },
});

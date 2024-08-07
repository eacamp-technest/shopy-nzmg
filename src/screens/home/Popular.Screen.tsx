import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Buttons} from 'components/Buttons';
import {BottomSheet} from 'components/BottomSheet';
import {CommonStyles} from 'theme/common.styles';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {IProduct, ProductCard} from 'components/ProductCard';
import {Category} from 'components/Category';
import axios from 'axios';
import {TypographyStyles} from 'theme/typography';
import {categories} from 'screens/main/Home.Screen';
import {useStatusBar} from 'helpers/useStatusBar';

export const PopularScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.popular>
> = ({navigation}) => {
  const [status, setStatus] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const EndPoint = 'https://fakestoreapi.com/products';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const filterProducts = useCallback(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const mapCategory: {[key: string]: string} = {
        Women: "women's clothing",
        Men: "men's clothing",
        Electronics: 'electronics',
        Jewelery: 'jewelery',
        New: 'new',
      };
      const filtered = products.filter(
        product => product.category === mapCategory[selectedCategory],
      );
      setFilteredProducts(filtered);
    }
  }, [products, selectedCategory]);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, filterProducts]);

  const renderItem = useCallback(
    ({item}: {item: IProduct}) => {
      return (
        <ProductCard
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          category={item.category}
          onPress={() =>
            navigation.navigate(Routes.productDetail, {product: item})
          }
        />
      );
    },
    [navigation],
  );
  const fetch = async (data: any) => {
    await axios({
      url: data,
      method: 'GET',
    })
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  useStatusBar('light-content', colors.bdazzleBlue.darkest);
  useEffect(() => {
    fetch(EndPoint);
  }, []);
  return (
    <View style={[CommonStyles.flexAlignCenter]}>
      <View style={styles.container}>
        <Navbar
          onLeftPress={() => navigation.goBack()}
          onRightPress={() => setStatus(true)}
          rootStyle={styles.navbar}
          title="MOST POPULAR"
          rightActionType="icon"
          titleColor={colors.white}
          right={require('assets/vectors/sliders.svg')}
          leftActionType="icon"
          left={require('assets/vectors/left.svg')}
        />
      </View>
      <View style={styles.product}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.white} />
        ) : (
          <View>
            <FlatList
              numColumns={2}
              data={filteredProducts}
              renderItem={renderItem}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={({item}) => (
                      <Category
                        style={styles.category}
                        item={item}
                        backgroundColor={colors.primary.base}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                      />
                    )}
                    horizontal={true}
                    keyExtractor={item => item}
                  />
                </>
              }
              contentContainerStyle={styles.contentStyle}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={
                <Text style={styles.emptyComponentText}>No Products found</Text>
              }
            />
          </View>
        )}
      </View>

      {status && (
        <BottomSheet
          buttonText="Apply"
          titleStyle={{paddingTop: 26, paddingBottom: 16}}
          title="Sort By"
          Children={sortBy.map((item, index) => (
            <Navbar
              key={index}
              leftTextStyle={styles.checkTitle}
              leftActionType="text"
              rightActionType="checkBox"
              checkSquare={true}
              onRightPress={() => handleSelect(index)}
              check={selectedIndex === index}
              left={item}
            />
          ))}
          onPress={() => {
            setStatus(false);
            if (selectedIndex !== null) {
              const sortCriteria =
                selectedIndex === 0 ? 'lowestPrice' : 'highestPrice';
              navigation.navigate(Routes.itemlistScreen, {sortCriteria});
            }
          }}
          setStatus={setStatus}
        />
      )}
    </View>
  );
};
const sortBy = ['Lowest price', 'Highest price'];
const styles = StyleSheet.create({
  navbar: {
    paddingHorizontal: normalize('horizontal', 18),
    paddingBottom: 24,
  },
  container: {
    backgroundColor: colors.bdazzleBlue.darkest,
    width: '100%',
    height: 245,
    position: 'absolute',
  },
  contentStyle: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  category: {
    backgroundColor: colors.bdazzleBlue.base,
    color: colors.white,
  },
  product: {
    marginTop: 72,
  },
  checkTitle: {
    color: colors.ink.darkest,
    ...TypographyStyles.RegularNoneRegular,
  },
  emptyComponentText: {
    ...TypographyStyles.RegularTightSemiBold,
    marginTop: normalize('vertical', 20),
    color: colors.white,
    textAlign: 'center',
  },
});

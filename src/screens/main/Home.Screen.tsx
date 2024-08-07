import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/routes';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {Input} from 'components/Input';
import {Category} from 'components/Category';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import {TypographyStyles} from 'theme/typography';
import {IProduct, ProductCard} from 'components/ProductCard';
import axios from 'axios';
import {useStatusBar} from 'helpers/useStatusBar';

export const categories: string[] = [
  'All',
  'Women',
  'Men',
  'Electronics',
  'Jewelery',
  'New',
];

export const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>
> = ({navigation}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [index, setIndex] = useState<number>(0);
  const {top} = useSafeAreaInsets();
  const [seeAll, setSeeAll] = useState<boolean>(false);
  const EndPoint = 'https://fakestoreapi.com/products';

  const fetchProducts = async () => {
    try {
      const response = await axios.get(EndPoint);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
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
    fetchProducts();
  }, []);
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
          onPress={() => {
            navigation.navigate(Routes.productDetail, {product: item});
          }}
        />
      );
    },
    [navigation],
  );

  const AllStore: React.FC = () => {
    return (
      <View style={styles.allStore}>
        <Navbar
          left={'CATEGORIES'}
          leftTextStyle={[styles.leftColor, TypographyStyles.title3]}
          leftActionType="text"
          rightActionType="text"
          onRightPress={() => setSeeAll(!seeAll)}
          right={'See All'}
        />
        {loading ? (
          <ActivityIndicator size="large" color={colors.ink.base} />
        ) : (
          <View>
            <FlatList
              numColumns={2}
              data={
                seeAll
                  ? filteredProducts.slice(0, 12)
                  : filteredProducts.slice(0, 2)
              }
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
              ListFooterComponent={
                <View>
                  <Navbar
                    style={{flex: 0.7}}
                    left={'POPULAR PRODUCTS'}
                    leftTextStyle={[styles.leftColor, TypographyStyles.title3]}
                    leftActionType="text"
                    rightActionType="text"
                    onRightPress={() => navigation.navigate(Routes.popular)}
                    right={'See All'}
                  />
                  <FlatList
                    numColumns={2}
                    data={filteredProducts.slice(2)}
                    renderItem={renderItem}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id.toString()}
                  />
                </View>
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
    );
  };

  useStatusBar('light-content', colors.bdazzleBlue.darkest);

  const InStore: React.FC = () => {
    return (
      <View>
        <Text> In Store</Text>
      </View>
    );
  };

  const renderScene = SceneMap({
    allStore: AllStore,
    inStore: InStore,
  });

  return (
    <SafeAreaProvider style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Navbar
          mode="dark"
          title="SHOPPAY"
          titleColor="white"
          left={vectors.menu}
          leftActionType="icon"
          onLeftPress={() => console.log('menu')}
          right={vectors.shoppingBag}
          rightActionType="icon"
          onRightPress={() => navigation.navigate(Routes.nortification)}
        />
        <Input
          icon={vectors.search}
          type="text"
          placeholder="Search brand products.."
          style={styles.input}
          onInputPress={() => navigation.navigate(Routes.search)}
        />
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        swipeEnabled={true}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({route, color}) => (
              <Text style={[TypographyStyles.RegularNoneSemiBold, {color}]}>
                {route.title}
              </Text>
            )}
            inactiveColor={colors.white}
            activeColor={colors.skyBlue.base}
            contentContainerStyle={styles.contentContainerStyle}
          />
        )}
        animationEnabled={true}
        onIndexChange={setIndex}
        sceneContainerStyle={styles.sceneContainerStyle}
      />
    </SafeAreaProvider>
  );
};

const routes = [
  {key: 'allStore', title: 'All Stores'},
  {key: 'inStore', title: 'In-Store'},
];

const vectors = {
  search: {
    source: require('assets/vectors/search.svg'),
    width: 24,
    height: 24,
    color: colors.ink.base,
  },
  menu: {
    icon: require('assets/vectors/menu.svg'),
    color: colors.white,
  },
  shoppingBag: {
    icon: require('assets/vectors/bell.svg'),
    color: colors.white,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 24),
    color: colors.white,
    backgroundColor: colors.bdazzleBlue.darkest,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginVertical: normalize('vertical', 24),
  },
  contentContainerStyle: {
    backgroundColor: colors.bdazzleBlue.darkest,
  },
  tableRight: {
    ...TypographyStyles.RegularTightSemiBold,
    color: colors.primary.base,
  },
  sceneContainerStyle: {
    paddingTop: 8,
  },
  allStore: {
    marginHorizontal: normalize('horizontal', 24),
  },
  contentStyle: {paddingBottom: 150},
  leftColor: {color: colors.ink.darkest},
  emptyComponentText: {
    ...TypographyStyles.RegularTightSemiBold,
    marginTop: normalize('vertical', 20),
    color: colors.ink.dark,
    textAlign: 'center',
  },
});

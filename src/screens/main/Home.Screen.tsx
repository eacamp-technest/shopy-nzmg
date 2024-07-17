import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar } from 'components/Navbar';
import { colors } from 'theme/colors';
import { normalize } from 'theme/metrics';
import { NavigationParamList } from 'types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Routes } from 'router/routes';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Input } from 'components/Input';
import { Category } from 'components/Category';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import { useUserStoreActions } from 'store/user';
import { TypographyStyles } from 'theme/typography';
import { useFocusEffect } from '@react-navigation/native';
import { useCustomStatusBar } from 'helpers/useCustomStatusBar';
import { IProduct, ProductCard } from 'components/ProductCard';
import data from 'data/data.json';
import axios from 'axios';

const categories: string[] = ['All', 'Shoes', 'Tshirt', 'Kids', 'New'];

export const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>
> = ({ navigation }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [index, setIndex] = useState<number>(0);
  const { top } = useSafeAreaInsets();
  const [seeAll, setSeeAll] = useState<boolean>(false);
  const EndPoint = 'https://fakestoreapi.com/products';
  const renderItem = useCallback(
    ({ item }: { item: IProduct }) => {
      return (
        <ProductCard
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          category={item.category}
          onPress={() => navigation.navigate(Routes.productDetail)}
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
              data={seeAll ? products.slice(0, 12) : products.slice(0, 2)}
              renderItem={renderItem}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem={({ item }) => (
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
                    style={{ flex: 0.7 }}
                    left={'POPULAR PRODUCTS'}
                    leftTextStyle={[styles.leftColor, TypographyStyles.title3]}
                    leftActionType="text"
                    rightActionType="text"
                    onRightPress={() => navigation.navigate(Routes.popular)}
                    right={'See All'}
                  />
                  <FlatList
                    numColumns={2}
                    data={products.slice(12)}
                    renderItem={renderItem}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id.toString()}
                  />
                </View>
              }
              contentContainerStyle={styles.contentStyle}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        )}
      </View>
    );
  };
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

  useEffect(() => {
    fetch(EndPoint);
  }, []);

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

  useCustomStatusBar({
    backgroundColor: colors.bdazzleBlue.darkest,
    barStyle: 'light-content',
  });

  return (
    <SafeAreaProvider style={styles.root}>
      <View style={[styles.header, { paddingTop: top }]}>
        <Navbar
          mode="dark"
          title="SHOPPAY"
          titleColor="white"
          left={vectors.menu}
          leftActionType="icon"
          onLeftPress={navigation.goBack}
          right={vectors.shoppingBag}
          onRightPress={() => navigation.navigate(Routes.itemlistScreen)}
          rightActionType="icon"
        />
        <Input
          icon={vectors.search}
          type="text"
          placeholder="Search brand products.."
          style={styles.input}
          onInputPress={() =>
            navigation.navigate(Routes.search, {
              items: [
                'Nike Air Max 270 React',
                'Nike Air Max 270 React ENG',
                'Nike Air Max 97 Utility',
                'Nike Air Vapormax',
              ],
              onItemPress: item => console.log('item pressed', item),
              headerTitle: 'Flowers',
            })
          }
        />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        swipeEnabled={true}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({ route, color }) => (
              <Text style={[TypographyStyles.RegularNoneSemiBold, { color }]}>
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
  { key: 'allStore', title: 'All Stores' },
  { key: 'inStore', title: 'In-Store' },
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
    icon: require('assets/vectors/shopping-bag.svg'),
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
  contentStyle: { paddingBottom: 150 },
  leftColor: { color: colors.ink.darkest },
});

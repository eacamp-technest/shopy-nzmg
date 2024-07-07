import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import data from "data/data.json"

const categories: string[] = ['All', 'Shoes', 'Tshirt', 'Kids', 'New'];

export const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>
> = ({ navigation }) => {
  const [products, setProducts] = useState<IProduct[]>(data.products)
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [value, setValue] = useState('');
  const [index, setIndex] = useState<number>(0);
  const { top } = useSafeAreaInsets();

  const AllStore: React.FC = () => {
    return (
      <View style={styles.allStore}>
        <Navbar
          left={'CATEGORIES'}
          leftTextStyle={{color: colors.ink.darkest}}
          leftActionType="text"
          rightActionType="text"
          onRightPress={() => console.log('--->')}
          right={'See All'}
        />
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item, index }) => (<ProductCard item={item} />)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={categories}
                renderItem={({ item }) => (<Category item={item} backgroundColor={colors.primary.base} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />)} horizontal={true} keyExtractor={(item) => item} />
            </>
          }
          contentContainerStyle={{ paddingBottom: 150 }}
        />
      </View>
    );
  };
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
  // useFocusEffect(
  //   useCallback(() => {
  //     StatusBar.setBarStyle('light-content');
  //     return () => {
  //       StatusBar.setBarStyle('dark-content');
  //     };
  //   }, []),
  // );

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
          onRightPress={() => navigation.navigate(Routes.filters)}
          rightActionType="icon"
        />
        <Input
          icon={vectors.search}
          type='text'
          placeholder="Search brand products.."
          style={styles.input}
          onInputPress={() => navigation.navigate(Routes.search, {
            items: ['Nike Air Max 270 React', 'Nike Air Max 270 React ENG', 'Nike Air Max 97 Utility', 'Nike Air Vapormax'],
            onItemPress: item => console.log('item pressed', item),
            headerTitle: 'Flowers'
          })}
        // value={value}
        // setValue={text => setValue(text)}
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
});

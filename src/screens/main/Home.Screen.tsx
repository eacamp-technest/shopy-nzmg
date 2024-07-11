import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import {SearchBar} from 'components/SearchBar';
import {Input} from 'components/Input';
import {Category} from 'components/Category';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import { ProductCard } from 'components/ProductCard';
import {Buttons} from 'components/Buttons';
import {useUserStoreActions} from 'store/user';
import {TypographyStyles} from 'theme/typography';
import {useFocusEffect} from '@react-navigation/native';
import {useCustomStatusBar} from 'helpers/useCustomStatusBar';

const categories: string[] = ['All', 'Shoes', 'Tshirt', 'Kids', 'New'];

export const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>
> = ({navigation}) => {
  const {logout} = useUserStoreActions();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [value, setValue] = useState('');
  const [index, setIndex] = useState<number>(0);
  const {top} = useSafeAreaInsets();
  const [Categorys,setCategorys]=useState()
  const AllStore: React.FC = () => {
    return (
      <View style={styles.allStore}>
        <Navbar
          left={'CATEGORIES'}
          textStyle={{color: colors.ink.darkest}}
          leftActionType="text"
          rightActionType="text"
          onRightPress={() => console.log('--->')}
          right={'See All'}
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({item}) => (
            <Category
              item={item}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
          horizontal={true}
          keyExtractor={item => item}
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
  useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>setCategorys(json))

  })


  return (
    <SafeAreaProvider style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Navbar
          mode="dark"
          title="SHOPPAY"
          titleColor="white"
          left={vectors.menu}
          leftActionType="icon"
          onLeftPress={navigation.goBack}
          right={vectors.shoppingBag}
          onRightPress={() => console.log('shopping bag pressed')}
          rightActionType="icon"
        />
        <Input
          icon={vectors.search}
          placeholder="Search brand products.."
          style={styles.input}
          value={value}
          setValue={text => setValue(text)}
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
      <FlatList 
         data={Categorys}
         renderItem={({item})=>{
          <ProductCard 
             item={{title:item.price}}
           />
         }}
      />
     
      
      <Buttons text="Logout" onPress={logout} />
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

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useCustomStatusBar} from 'helpers/useCustomStatusBar';
import {colors} from 'theme/colors';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {TypographyStyles} from 'theme/typography';
import {Navbar} from 'components/Navbar';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {normalize} from 'theme/metrics';
import {IProduct, ProductCard} from 'components/ProductCard';
import axios from 'axios';
import {Buttons} from 'components/Buttons';
interface IData {
  id?: number;
  title?: string;
  price?: number;
  category?: string;
  image?: string;
}
export const BookmarkScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.bookmark>
> = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const {top} = useSafeAreaInsets();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const EndPoints = 'https://fakestoreapi.com/products';
  const renderItem = useCallback(
    ({item}: {item: IProduct}) => {
      return (
        <ProductCard
          horizontal={true}
          isLiked={true}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          size="m"
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

  const AllItems: React.FC = () => {
    return (
      <View
        style={{
          paddingHorizontal: normalize('horizontal', 24),
          paddingTop: 12,
        }}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.ink.base} />
        ) : (
          <View>
            <FlatList
              data={products}
              renderItem={renderItem}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        )}
      </View>
    );
  };

  const Boards: React.FC = () => {
    return (
      <View>
        <Text>Boards</Text>
      </View>
    );
  };
  const renderScene = SceneMap({
    allItems: AllItems,
    boards: Boards,
  });
  useCustomStatusBar({
    backgroundColor: colors.bdazzleBlue.darkest,
    barStyle: 'light-content',
  });
  useEffect(() => {
    fetch(EndPoints);
  }, []);
  return (
    <SafeAreaProvider style={styles.root}>
      <View style={[styles.header, {paddingTop: top}]}>
        <Navbar mode="dark" titleColor="white" title="saved items" />
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
  {key: 'allItems', title: 'All Items'},
  {key: 'boards', title: 'Boards'},
];
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 24),
    color: colors.white,
    paddingBottom: 16,
    backgroundColor: colors.bdazzleBlue.darkest,
  },
  contentContainerStyle: {
    backgroundColor: colors.bdazzleBlue.darkest,
  },

  sceneContainerStyle: {
    paddingTop: 8,
  },
});

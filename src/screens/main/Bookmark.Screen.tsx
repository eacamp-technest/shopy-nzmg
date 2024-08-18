import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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
import {useStatusBar} from 'helpers/useStatusBar';
import {useSavedItemsStore} from 'store/savedItem/savedItem.store';
import {categories} from './Home.Screen';

export const BookmarkScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.bookmark>
> = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const {top} = useSafeAreaInsets();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const EndPoints = 'https://fakestoreapi.com/products';

  const {
    savedItems,
    actions: {deleteItemFromSaved},
  } = useSavedItemsStore(state => state);

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
          onHeartPress={() => deleteItemFromSaved(item)}
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
              data={savedItems}
              renderItem={renderItem}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              ListEmptyComponent={
                <Text style={styles.emptyComponentText}>
                  No Products in favourites
                </Text>
              }
            />
          </View>
        )}
      </View>
    );
  };

  const Boards: React.FC = () => {
    const groupedItems = savedItems.reduce((groups: any, item: IProduct) => {
      const category = item.category || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
    return (
      <View style={styles.onBoard}>
        {Object.keys(groupedItems).length === 0 ? (
          <Text style={styles.emptyComponentText}> No boards created</Text>
        ) : (
          Object.keys(groupedItems).map(category => (
            <View key={category} style={styles.categoryText}>
              <Text
                style={[
                  TypographyStyles.RegularNoneSemiBold,
                  styles.onBoardText,
                ]}>
                {category}
              </Text>
              <FlatList
                data={groupedItems[category]}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ))
        )}
      </View>
    );
  };

  const renderScene = SceneMap({
    allItems: AllItems,
    boards: Boards,
  });
  useStatusBar('light-content', colors.bdazzleBlue.darkest);
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
  emptyComponentText: {
    ...TypographyStyles.RegularTightSemiBold,
    marginTop: normalize('vertical', 20),
    color: colors.ink.dark,
    textAlign: 'center',
  },
  onBoard: {
    paddingHorizontal: normalize('horizontal', 24),
    paddingTop: 12,
  },
  onBoardText: {
    marginBottom: 8,
  },
  categoryText: {
    marginBottom: normalize('vertical', 24),
  },
});

import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {ProductCard} from 'components/ProductCard';
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
  const [data, setData] = useState([]);
  const Endpoints = 'https://fakestoreapi.com/products';

  const fetch = async (data: any) => {
    await axios({
      url: data,
      method: 'GET',
    })
      .then(response => setData(response.data))
      .catch(err => console.log(err));
  };

  const AllItems: React.FC = () => {
    return (
      <View>
        <Text>AllItems</Text>
        <FlatList
          data={data}
          renderItem={({item}: {item: IData}) => (
            <View>
              <Text>{item.id}</Text>
            </View>
          )}
        />
      </View>
    );
  };
  const Boards: React.FC = () => {
    return (
      <View>
        <Text>Boards</Text>
        <Buttons
          text="Product Detail"
          onPress={() => navigation.navigate(Routes.productDetail)}
        />
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
    fetch(Endpoints);
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

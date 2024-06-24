import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {NavigationParamList} from 'types/navigation.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/routes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SearchBar} from 'components/SearchBar';
import {Input} from 'components/Input';
import {Category} from 'components/Category';
import axios from 'axios';
import ProgressBars from 'components/ProgressBars';
import {Buttons} from 'components/Buttons';
import {useUserStore} from 'store/user/user.store';
import {useUserStoreActions} from 'store/user';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const categories: string[] = ['All', 'Shoes', 'Tshirt', 'Kids', 'New'];

export const HomeScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.home>
> = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const {logout} = useUserStoreActions();
  const Endpoints = 'https://jsonplaceholder.typicode.com/photos';
  const [product, setProduct] = useState([]);
  const [value, setValue] = useState('');

  const fetch = async () => {
    const remoteData = {
      method: 'get',
      url: `${Endpoints}`,
    };
    try {
      const response = await axios(remoteData);
      const result = response.data;
      setProduct(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const filteredProduct = useMemo(() => {
    return product.filter((val: any) =>
      val.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    );
  }, [value, product]);
  return (
    <SafeAreaProvider style={styles.root}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.bdazzleBlue.darkest}
      />
      <View style={styles.header}>
        <Navbar
          mode="dark"
          title="SHOPPAY"
          titleColor="white"
          left={require('../../assets/vectors/menu.svg')}
          leftActionType="icon"
          onLeftPress={navigation.goBack} //  it's temporarily added . change it
          right={require('../../assets/vectors/shopping-bag.svg')}
          onRightPress={() => console.log('shopping bag pressed')}
          rightActionType="icon"
        />
        <Input
          icon={require('../../assets/vectors/search.svg')}
          placeholder="Search brand products.."
          style={styles.input}
          value={value}
          setValue={text => setValue(text)}
        />
      </View>
      <View style={styles.categories}>
        <Navbar
          left={'CATEGORIES'}
          textStyle={{color: colors.ink.darkest}}
          leftActionType="text"
          rightActionType="text"
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
      <FlatList
        data={filteredProduct}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}: {item: any}) => (
          <View style={styles.contain}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
      <Buttons text="Logout" onPress={logout} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingHorizontal: normalize('horizontal', 24),
    color: colors.white,
    gap: normalize('vertical', 24),
    backgroundColor: colors.bdazzleBlue.darkest,
  },
  categories: {
    paddingHorizontal: normalize('horizontal', 24),
    backgroundColor: colors.white,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  contain: {
    backgroundColor: 'gray',
    margin: 10,
    padding: 10,
  },
});

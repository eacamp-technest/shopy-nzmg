import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  FlatList,
  View,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {searchScreenOptions} from 'configs/navigation.configs';
import {discover} from 'constants/discover';
import {TypographyStyles} from 'theme/typography';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {useStatusBar} from 'helpers/useStatusBar';
import axios from 'axios';
import {Endpoints} from 'services/Endpoints';
import {IProduct} from 'components/ProductCard';
import {normalize} from 'theme/metrics';

export const SearchScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.search>
> = ({route, navigation}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const onChangeText = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const text = event.nativeEvent.text;
      setSearchText(text);

      const filtered = products.filter((item: any) => {
        return item.title.toLowerCase().startsWith(text.toLowerCase());
      });
      setFilteredProducts(filtered);
    },
    [products],
  );

  const renderItems = useCallback(
    ({item}: {item: IProduct}) => {
      return (
        <Pressable
          style={{
            paddingHorizontal: normalize('horizontal', 24),
          }}
          onPress={() =>
            navigation.navigate(Routes.productDetail, {product: item})
          }>
          <Text>{item.title}</Text>
        </Pressable>
      );
    },
    [navigation],
  );

  useStatusBar('dark-content', colors.white);

  useEffect(() => {
    navigation.setOptions({
      ...searchScreenOptions,
      headerSearchBarOptions: {
        ...searchScreenOptions.headerSearchBarOptions,
        onChangeText,
      },
    });
  }, [navigation, onChangeText]);

  const renderSuggestions = () => (
    <View style={styles.suggestionsContainer}>
      <Navbar
        leftActionType="text"
        left={'SUGGESTIONS'}
        leftTextStyle={styles.suggestionsTitle}
        rootStyle={TypographyStyles.title3}
      />
      <View style={styles.suggestionsGrid}>
        {discover.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => navigation.navigate(item.onPress)}
            style={styles.suggestionItem}>
            <Image
              source={item.placeholder}
              style={[
                styles.suggestionImage,
                {backgroundColor: item.background},
              ]}
            />
            <Text style={TypographyStyles.SmallNoneSemiBold}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(Endpoints.product);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <FlatList
      ListHeaderComponent={searchText === '' ? renderSuggestions : null}
      data={searchText === '' ? [] : filteredProducts}
      renderItem={renderItems}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{
        gap: 32,
        marginVertical: normalize('vertical', 24),
      }}
      contentInsetAdjustmentBehavior="automatic"
    />
  );
};

const styles = StyleSheet.create({
  suggestionsContainer: {
    padding: 24,
    gap: 16,
  },
  suggestionsTitle: {color: colors.ink.base},
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  suggestionItem: {
    width: '48%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  suggestionImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 8,
  },
});

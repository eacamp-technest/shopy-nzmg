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

export const SearchScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.search>
> = ({route, navigation}) => {
  const {onItemPress, items, ...rest} = route.params;
  const [data, setData] = useState<string[]>(items ?? []);
  const [searchText, setSearchText] = useState<string>('');

  const onChangeText = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const text = event.nativeEvent.text;
      setSearchText(text);
      const filtered = items?.filter(item => {
        return item.toLowerCase().includes(text.toLowerCase());
      });
      setData(filtered ?? []);
    },
    [items],
  );

  const renderItems = useCallback(
    ({item}: {item: any}) => {
      return (
        <Pressable
          style={{padding: 10}}
          onPress={() => {
            onItemPress?.(item);
            navigation.pop();
          }}>
          <Text>{item}</Text>
        </Pressable>
      );
    },
    [onItemPress, navigation],
  );

  useEffect(() => {
    navigation.setOptions({
      ...searchScreenOptions,
      headerSearchBarOptions: {
        ...searchScreenOptions.headerSearchBarOptions,
        onChangeText,
      },
      ...rest,
    });
  }, [navigation, onChangeText, rest]);

  const renderSuggestions = () => (
    <View style={styles.suggestionsContainer}>
      <Navbar
        leftActionType="text"
        left={'SUGGESTIONS'}
        leftTextStyle={styles.suggestionsTitle}
        rootStyle={TypographyStyles.title3}
      />
      <View style={styles.suggestionsGrid}>
        {discover.map(item => (
          <Pressable
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

  return (
    <FlatList
      ListHeaderComponent={searchText === '' ? renderSuggestions : null}
      data={searchText === '' ? [] : data} // Show suggestions if no search text, otherwise show filtered data
      renderItem={renderItems}
      contentContainerStyle={{gap: 32}}
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
    width: '48%', // Adjust to ensure two items per row
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

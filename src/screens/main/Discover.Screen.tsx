import {View, FlatList, Image, StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import {discover} from 'constants/discover';
import {CommonStyles} from 'theme/common.styles';
import {TypographyStyles} from 'theme/typography';
import {colors} from 'theme/colors';
import {normalize} from 'theme/metrics';
import {Routes} from 'router/routes';
import {NavigationParamList} from 'types/navigation.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useStatusBar} from 'helpers/useStatusBar';

export const DiscoverScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.discover>
> = ({navigation}) => {
  useStatusBar('dark-content', colors.white);
  return (
    <SafeAreaProvider style={styles.root}>
      <FlatList
        data={discover}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation.navigate(item.onPress)}
            style={[
              {
                backgroundColor: `${item.background}`,
              },
              styles.contain,
              CommonStyles.flexRow,
            ]}>
            <Text style={[TypographyStyles.title3, styles.title]}>
              {item.title}
            </Text>
            <Image style={styles.image} source={item.image} />
          </Pressable>
        )}
      />
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 12,
  },
  contain: {
    margin: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  title: {
    color: colors.white,
    alignSelf: 'flex-end',
    paddingHorizontal: normalize('horizontal', 24),
    paddingBottom: 16,
    position: 'absolute',
  },
  image: {
    flexShrink: 1,
    height: 184,
  },
});

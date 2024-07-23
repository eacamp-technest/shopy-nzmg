import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useCustomStatusBar } from 'helpers/useCustomStatusBar';
import { colors } from 'theme/colors';
import { IProduct, ProductCard } from 'components/ProductCard';
import { Routes } from 'router/routes';
import data from 'data/data.json';
import { NavigationParamList } from 'types/navigation.types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IReview, reviews } from 'data/reviewData';
import { Rating } from 'components/Rating';

export const NortificationScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.nortification>
> = ({ navigation }) => {

  const [products, setProducts] = useState<IProduct[]>(data.products);

  const renderLiked = ({ item, index }: { item: IProduct, index: number }) => {
    return <ProductCard id={index} title={item.title} image={item.image} size='m' price={item.price} horizontal={true} isCounter={item.isCounter} isLiked={true} onPress={() => navigation.navigate(Routes.productDetail)} />
  }
  const renderInCart = ({ item, index }: { item: IProduct, index: number }) => {
    return <ProductCard id={index} title={item.title} image={item.image} size='s' price={item.price} horizontal={true} isCounter={true} onPress={() => navigation.navigate(Routes.productDetail)} />
  }

  useCustomStatusBar({ backgroundColor: colors.white, barStyle: 'dark-content' });

  return (
    <View style={styles.container}>
      <Text>Nortification.Screen</Text>
      <FlatList
        numColumns={1}
        data={products}
        // keyExtractor={(item: IProduct) => item.id.toString()}
        renderItem={renderInCart}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "white"
  },
})
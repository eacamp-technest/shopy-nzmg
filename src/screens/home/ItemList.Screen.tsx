import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { IProduct, ProductCard } from 'components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { colors } from 'theme/colors';
import { Navbar } from 'components/Navbar';
import { TypographyStyles } from 'theme/typography';
import { Routes } from 'router/routes';
import { IBrand, brands } from 'data/brands';
import { normalize } from 'theme/metrics';


export const ItemListScreen = () => {
  const navigation = useNavigation()
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const EndPoints = 'https://fakestoreapi.com/products';

  const renderBrand = ({ item }: { item: IBrand }) => {
    return (
      <View style={styles.brandContainer}>
        <Image style={styles.img} source={item.image} />
        <Text style={styles.text}>{item.name}</Text>
      </View>
    )
  }
  const renderList = useCallback(
    ({ item }: { item: IProduct }) => {
      return (
        <ProductCard
          id={item.id}
          size='s'
          title={item.title}
          image={item.image}
          horizontal={true}
          price={item.price}
          onPress={() => navigation.navigate(Routes.productDetail)}
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
  useEffect(() => {
    fetch(EndPoints);
  }, []);
  return (
    <View style={styles.container}>
      <Navbar
        mode='light'
        title="SHOES"
        titleColor={colors.ink.base}
        left={vectors.leftVector}
        leftActionType="icon"
        onLeftPress={navigation.goBack}
        right={vectors.filter}
        onRightPress={() => navigation.navigate(Routes.filters)}
        rightActionType="icon"
      />
      <View>
        <Navbar
          style={{ flex: 0.7 }}
          left={'BRAND'}
          leftTextStyle={styles.leftStyle}
          leftActionType="text"
          rightActionType="text"
          onRightPress={() => console.log("aa")}
          right={'See All'}
        />

        <View style={styles.brand}>
          <FlatList
            numColumns={brands.length}
            renderItem={renderBrand}
            data={brands}
            showsHorizontalScrollIndicator={false}
          />
        </View>

      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.ink.base} />
      ) : (
        <View style={styles.products}>
          <FlatList
            data={products}
            renderItem={renderList}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={
              <>
                <Navbar
                  style={{ flex: 0.7 }}
                  left={'PRODUCT'}
                  leftTextStyle={styles.leftStyle}
                  leftActionType="text"
                  rightActionType="text"
                  onRightPress={() => console.log("aa")}
                  right={'See All'}
                />
              </>
            }
          />
        </View>
      )}
    </View>
  )
}
const vectors = {
  leftVector: {
    icon: require('assets/vectors/left.svg'),
    color: colors.ink.base,
  },
  filter: {
    icon: require('assets/vectors/filter.svg'),
    color: colors.ink.base,
  },
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24
  },
  leftStyle: {
    ...TypographyStyles.title3,
    color: colors.ink.base,
  },
  brand: {
    marginBottom: normalize('vertical', 26),
    marginTop: normalize('vertical', 10)
  },
  img: {
    height: normalize('width', 70),
    width: normalize('width', 70)
  },
  brandContainer: {
    alignItems: 'center',
    marginRight: normalize('horizontal', 16),
  },
  text: {
    ...TypographyStyles.TinyNoneSemiBold,
    color: colors.ink.base,
    marginTop: normalize('vertical', 12)
  },

  products: {
    marginTop: normalize('vertical', 10)
  }
})
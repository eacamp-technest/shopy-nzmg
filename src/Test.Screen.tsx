import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { IProduct, ProductCard } from 'components/ProductCard'
import { Category } from 'components/Category'
import data from "data/data.json"

const categories: string[] = ['Trending Now', 'All', 'New', 'Men', 'Women']

export const TestScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [products, setProducts] = useState<IProduct[]>(data.products)

  return (
    <SafeAreaProvider style={styles.container}>
      <FlatList
        numColumns={2}
        data={products}
        renderItem={({ item, index }) => (<ProductCard item={item} />)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={({ item }) => (<Category item={item} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />)} horizontal={true} keyExtractor={(item) => item} />
          </>
        }
        contentContainerStyle={{ paddingBottom: 150 }}
      />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 3
  },
})

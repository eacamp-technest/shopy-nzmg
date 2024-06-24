import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TypographyStyles } from 'theme/typography';
import { colors } from 'theme/colors';

export interface IProduct {
    id: number;
    title: string;
    price?: number;
    image?: string;
    link?: string
}

export type RootStackParamList = {
    Home: undefined;
    productDetails: { item: IProduct };
};

interface IProductCard {
    item: IProduct;

}

export function ProductCard({ item }: IProductCard) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    return (
        <TouchableOpacity onPress={() => { navigation.navigate("productDetails", { item }) }} style={styles.container}>
            <Image style={styles.img} source={{ uri: item.image }} />
            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.link}>{item.link}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 24,
    },
    img: {
        width: 156,
        height: 141,
        borderRadius: 8,
        marginVertical: 10,
        marginLeft: 10
    },
    title: {
        ...TypographyStyles.RegularNoneSemiBold,
        color: colors.ink.base
    },
    price: {
        ...TypographyStyles.TinyNormalBold,
        color: colors.ink.base,
        marginVertical: 8
    },
    link: {
        ...TypographyStyles.TinyNormalRegular,
        color: colors.ink.lighter
    },
    content: {
        marginLeft: 10
    },
})
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from 'theme/colors';
import { TypographyStyles } from 'theme/typography';
import { normalize } from 'theme/metrics';

interface ICategory {
    item: string;
    selectedCategory: string | null;
    setSelectedCategory: (category: string) => void
}


export function Category({ item, selectedCategory, setSelectedCategory }: ICategory) {
    return (
        <TouchableOpacity style={styles.main} onPress={() => setSelectedCategory(item)}>
            <Text style={[styles.categoryText, selectedCategory === item && { color: colors.white, backgroundColor: colors.primary.base }]}>{item}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    categoryText: {
        ...TypographyStyles.RegularNoneRegular,
        backgroundColor: colors.sky.lightest,
        color: colors.ink.base,
        paddingVertical: normalize('vertical', 8),
        paddingHorizontal: 16,
        textAlign: 'center',
        borderRadius: 16,
        marginHorizontal: 8
    },
    main: {
        paddingVertical: normalize('vertical', 32)
    }
})
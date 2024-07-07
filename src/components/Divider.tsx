import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from 'theme/colors'

interface IDivider {
    height: "S" | "M" | 'L';
    style?: StyleProp<ViewStyle>;
}

export const Divider: React.FC<IDivider> = ({ height, style }) => {
    return (
        <View style={[{ backgroundColor: colors.sky.lightest }, styles[height], style]} />
    )
}

const styles = StyleSheet.create({
    S: {
        height: 1
    },
    M: {
        height: 12
    },
    L: {
        height: 20
    }
})
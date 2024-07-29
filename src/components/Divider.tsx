import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from 'theme/colors'
import { windowWidth } from 'theme/Const.styles';

interface IDivider {
    height: "S" | "M" | 'L';
    style?: StyleProp<ViewStyle>;
}

export const Divider: React.FC<IDivider> = ({ height, style }) => {
    return (
        <View style={[styles[height], style]} />
    )
}

const styles = StyleSheet.create({
    S: {
        height: 1,
        width: 375,
        backgroundColor: colors.sky.lighter
    },
    L: {
        height: 12,
        width: windowWidth,
        backgroundColor: colors.sky.lightest
    },
    M: {
        height: 1,
        width: 327,
        backgroundColor: colors.sky.lighter
    }
})
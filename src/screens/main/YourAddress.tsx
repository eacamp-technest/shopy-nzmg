import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Navbar } from 'components/Navbar'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationParamList } from 'types/navigation.types'
import { Routes } from 'router/routes'
import { colors } from 'theme/colors'
import { Buttons } from 'components/Buttons'
import { Divider } from 'components/Divider'
import { Address } from 'components/Address'
import { normalize } from 'theme/metrics'

export const YourAddress: React.FC<
    NativeStackScreenProps<NavigationParamList, Routes.yourAddress>
> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Navbar
                onLeftPress={() => navigation.goBack()}
                title="ADD ADDRESS"
                titleColor={colors.ink.base}
                leftActionType="icon"
                mode='light'
                left={require('assets/vectors/left.svg')}
                rootStyle={styles.nav}
            />
            <Address />
            <Divider height='M' />
            <Address />
            <Buttons types='outlined' text='Add new address' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: normalize('horizontal', 24)
    }
})
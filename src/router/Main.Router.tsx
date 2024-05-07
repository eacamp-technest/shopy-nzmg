import { StyleSheet } from 'react-native'
import React from 'react'
import { TestScreen } from 'Test.Screen'
import { NavigationParamList } from 'types/navigation.types'
import { Routes } from './routes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const MainStack = createNativeStackNavigator<NavigationParamList>()

export const MainRouter = () => {
    return (
        <MainStack.Navigator initialRouteName={Routes.test}>
            <MainStack.Screen name={Routes.test} component={TestScreen} />
        </MainStack.Navigator>
    )
}

const styles = StyleSheet.create({})
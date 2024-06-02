import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TabView, SceneMap } from 'react-native-tab-view'
import { windowWidth } from 'theme/consts.styles'
import { Routes } from 'router/routes'
import { useUserStoreActions } from 'store/user'
import { PaymentMethodScreen } from './PaymentMethod.Screen'
import { YourCardScreen } from './YourCard.Screen'
import { AddNewCardScreen } from './AddNewCard.Screen'

const renderScene = SceneMap({
    [Routes.paymentMethod]: PaymentMethodScreen,
    [Routes.yourCard]: YourCardScreen,
    [Routes.addnewcard]: AddNewCardScreen,
})
const routes = [
    { key: Routes.paymentMethod },
    { key: Routes.yourCard },
    { key: Routes.addnewcard }
]
export const PaymentScreensTab = () => {
    const [index, setIndex] = useState(0)
    const { initialize } = useUserStoreActions()
    useEffect(() => {
        console.log("useEffect called");
        initialize();
    }, [])
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            swipeEnabled={false}
            renderTabBar={() => null}
            animationEnabled={true}
            onIndexChange={setIndex}
            initialLayout={styles.initialLayout}
        />
    )
}
const styles = StyleSheet.create({
    root: {
        borderWidth: 1
    },
    initialLayout: {
        width: windowWidth
    }
})
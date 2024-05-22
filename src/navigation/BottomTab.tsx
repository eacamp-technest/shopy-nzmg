// import { Image } from 'react-native'
// import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { colors } from 'theme/colors'
// import { TestScreen } from 'Test.Screen'

// const BottomTab = () => {
//     const Tab = createBottomTabNavigator()
//   return (
//     <Tab.Navigator
//     initialRouteName='test'
//     screenOptions={{tabBarStyle: {height:65, paddingTop:5}, tabBarLabelStyle: {marginBottom:10}, tabBarShowLabel: false}}>
//         <Tab.Screen name='test'
//         component={TestScreen}
//         options={{
//         headershown: false,
//         tabBarIcon:({color, size, focused}) =>(
//             < Image source={require('../assets/vectors/home.svg')} style={{ tintColor: focused ? colors.primary.base : colors.ink.lighter }} />
//         )
//     }}/>

//     </Tab.Navigator>
//   )
// }

// export default BottomTab
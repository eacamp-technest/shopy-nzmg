import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { version } from 'react'
import { CommonStyles } from 'theme/common.styles'
import { windowWidth } from 'theme/consts.styles'
import { TypographyStyles } from 'theme/typography'
import { Button } from 'components/Button'
import { colors } from 'theme/colors'
import { Pagination } from 'components/Pagination'
import { normalize } from 'theme/metrics'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NavigationParamList } from 'types/navigation.types'
import { Routes } from 'router/routes'
import { onboarding } from 'constants/onboarding'
import X from '../../assets/vectors/logo.svg'


export const WelcomeScreen: React.FC<NativeStackScreenProps<NavigationParamList, Routes.welcome>> = ({ navigation }) => {
    const navigateToLogin = () => navigation.navigate(Routes.login)
    const navigateToRegister = () => navigation.navigate(Routes.register)
    const renderItem = ({ item }: { item: (typeof onboarding)[0] }) => {
        return item.id === 0 ? (
            <View style={styles.background}>
                <View style={styles.round}><View style={styles.logo2} ><X /></View></View>
                <Image source={item.image} resizeMode='cover' style={styles.image} />

                <Text style={TypographyStyles.title2}>{item.title}</Text>
                <Pagination selectedIndex={item.id} />
                <View style={styles.buttons}>
                    <Button
                        text="Create an account"
                        size='block'
                        type='primary'
                        onPress={navigateToRegister}
                    />
                    <Button
                        text="Log in Instead"
                        size='block'
                        type='primary'
                        onPress={navigateToLogin}
                    />
                </View>
            </View>
        ) : item.id === 1 ? (
            <View style={styles.secondary}>
                <View style={styles.round}><View style={styles.logo2} ><X /></View></View>
                <Image source={item.image} style={styles.smallImage} />
                <View style={styles.main}>
                    <Text style={[TypographyStyles.title2, TypographyStyles.textAlignCenter]}>{item.title}</Text>
                    <Pagination selectedIndex={item.id} />
                </View>
                <View style={styles.buttons}>
                    <Button
                        text="Create an account"
                        size='block'
                        type='primary'
                        onPress={navigateToRegister}
                    />
                    <Button
                        text="Log in Instead"
                        size='block'
                        type='primary'
                        onPress={navigateToLogin}
                    />
                </View>
                <View style={styles.termsView}>
                    <Text style={TypographyStyles.SmallNormalRegular}>Help</Text>
                    <View style={styles.divider} />
                    <Text style={TypographyStyles.SmallNormalRegular}>Terms</Text>
                </View>
            </View>
        ) : (
            <View style={styles.secondary}>
                <View style={styles.round}><View style={styles.logo2} ><X /></View></View>
                <Image source={item.image} style={styles.lastImage} />
                <View style={styles.main}>
                    <Text style={[TypographyStyles.title2, TypographyStyles.textAlignCenter]}>{item.title}</Text>
                    <Pagination selectedIndex={item.id} />
                </View>
                <View style={styles.buttons}>
                    <Button
                        text="Create an account"
                        size='block'
                        type='primary'
                        onPress={navigateToRegister}
                    />
                    <Button
                        text="Log in Instead"
                        size='block'
                        type='primary'
                        onPress={navigateToLogin}
                    />
                </View>
                <View style={styles.termsView}>
                    <Text style={TypographyStyles.SmallNormalRegular}>Help</Text>
                    <View style={styles.divider} />
                    <Text style={TypographyStyles.SmallNormalRegular}>Terms</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.root}>
            <FlatList
                data={onboarding}
                initialScrollIndex={0}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                initialNumToRender={1}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainerStyle}
                style={CommonStyles.flex}
            />
        </View>
    )
}

const bottomSize = normalize('vertical', 37)
const horizontalSize = normalize('horizontal', 24)

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.sky.lightest
    },
    round: {
        width: 461,
        height: 461,
        borderRadius: 999,
        position: 'absolute',
        backgroundColor: colors.white,
        top: -197,
        right: 0,
    },
    logo2: {
        position: 'absolute',
        top: "50%",
        left: "50%",
    },
    buttons: {
        gap: normalize('vertical', 16)
    },
    main: {
        gap: horizontalSize,
        alignItems: 'center',
        marginTop: normalize('vertical', 32),
        marginBottom: normalize('vertical', 48)
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    smallImage: {
        width: '100%',
        height: normalize('height', 248)
    },
    lastImage: {
        width: '100%',
        height: normalize('height', 310)
    },
    contentContainerStyle: {},
    background: {
        width: windowWidth,
        justifyContent: 'flex-end',
        paddingBottom: bottomSize,
        paddingHorizontal: horizontalSize,
        gap: horizontalSize,
    },
    secondary: {
        width: windowWidth,
        justifyContent: 'flex-end',
        paddingBottom: bottomSize,
        padding: horizontalSize,
        flex: 1,
        backgroundColor: colors.white
    },
    termsView: {
        gap: normalize('horizontal', 8),
        paddingTop: normalize('vertical', 54),
        ...CommonStyles.alignJustifyCenterRow
    },
    divider: {
        width: 1,
        height: 15,
        backgroundColor: colors.ink.lighter
    },

})
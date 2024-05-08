import { ActivityIndicator, StyleSheet, Text as NativeText, Pressable, StyleProp, ViewStyle, PressableProps } from 'react-native'
import React, { useState } from 'react'
import { SvgImage } from './SvgImage'
import { normalize } from 'theme/metrics'
import { TTypesButton, getButtonTheme } from 'helpers/buttonTheme'
import { CommonStyles } from 'theme/common.styles'
import { TypographyStyles } from 'theme/typography'

type TPosition = 'left' | 'right' | 'center';
type TSize = 'small' | 'block' | 'large'
// type TTypes = 'primary' | 'secondary' | 'outlined' | 'transparent'

interface IButton {
    text: string,
    size?: TSize,
    type?: TTypesButton,
    icon?: NodeRequire | any,
    disabled?: boolean,
    loading?: boolean,
    position?: TPosition,
    onPress?: () => void,
    style?: StyleProp<ViewStyle>,
    hitSlop?: PressableProps['hitSlop'],
}

export const Button: React.FC<IButton> = ({ text, onPress, icon, loading, disabled, style, position = 'left', type = 'primary', size = 'block', hitSlop }) => {

    const [press, setPress] = useState<boolean>(false)

    const svgSize = size === 'small' ? 16 : 24;

    const onPressIn = () => setPress(true)
    const onPressOut = () => setPress(false)

    const { component: componentStyle, text: textStyle } = getButtonTheme(type, {
        press,
        disabled
    })

    const renderLoading = () => {
        return loading ? (
            <ActivityIndicator
                size={'small'}
                color={textStyle.color}
                style={StyleSheet.absoluteFillObject}
            />
        ) : null
    }

    return (
        <Pressable
            hitSlop={hitSlop}
            style={[
                styles.root,
                styles[size],
                styles[position],
                componentStyle,
                style
            ]}
            disabled={disabled || loading}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}>
            <NativeText style={[styles.text, textStyle]}>{text}</NativeText>
            {icon ? (
                <SvgImage
                    color={textStyle.color}
                    width={svgSize}
                    height={svgSize}
                    source={icon}
                />
            ) : null}
            {renderLoading()}
        </Pressable>
    )
}


const styles = StyleSheet.create({
    root: {
        borderRadius: 8,
        borderColor: 'transparent',
        overflow: 'hidden',
        ...CommonStyles.alignCenterJustifyBetweenRow
    },
    text: {
        ...TypographyStyles.RegularNoneSemilBold,
        color: 'white',
        flexGrow: 1,
        textAlign: 'center'
    },
    left: {
        flexDirection: 'row-reverse'
    },
    center: {
        ...CommonStyles.alignJustifyCenter
    },
    right: {},
    small: {
        borderWidth: 1,
        padding: normalize('vertical', 7),

    },
    block: {
        borderWidth: 1,
        padding: normalize('vertical', 15)
    },
    large: {
        borderWidth: 1,
        padding: normalize('vertical', 15)
    }
})
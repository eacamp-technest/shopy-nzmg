import { StyleSheet, Text as NativeText, Pressable } from 'react-native'
import React from 'react'

interface IButton {
    text: string,
    onPress?: () => void
}

export const Button: React.FC<IButton> = ({ text, onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <NativeText>{text}</NativeText>
        </Pressable>
    )
}

const styles = StyleSheet.create({})
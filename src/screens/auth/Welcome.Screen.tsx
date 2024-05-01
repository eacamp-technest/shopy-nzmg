import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TypographyStyles } from 'theme/typography'
import { Button } from 'components/Button'

export const WelcomeScreen = () => {
    return (
        <View>
            <Text style={TypographyStyles.title3}>Welcome.Screen</Text>
            <Text style={TypographyStyles.title1}>Welcome.Screen</Text>
            <Text style={TypographyStyles.title2}>Welcome.Screen</Text>
            <Button text='this is a button' />
        </View>
    )
}

const styles = StyleSheet.create({})
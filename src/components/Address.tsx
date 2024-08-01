import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const Address = () => {
    return (
        <View style={styles.container}>
            <Text>Address Component</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginBottom: 32
    }
})
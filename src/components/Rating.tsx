import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { SvgImage } from "./SvgImages";
import { colors } from "theme/colors";

interface RatingProps {
    rating: number;
    numberOfRates?: number
}
export const Rating: React.FC<RatingProps> = ({ rating = 0, numberOfRates = 0 }) => {
    const totalStars = 5;
    const stars = Array(totalStars).fill(0)
    return (
        <View style={styles.container}>
            <View style={styles.stars}>
                {stars.map((_, index) => (
                    <SvgImage
                        key={index}
                        fill={index < rating ? colors.yellow.base : colors.sky.light}
                        width={16}
                        height={16}
                        source={require('../assets/vectors/star.svg')}
                    />
                ))}
            </View>
            {numberOfRates !== undefined && (
                <Text style={styles.text}>({numberOfRates})</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 4,
        color: colors.sky.dark,
    },
});

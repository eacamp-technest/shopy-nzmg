import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { SvgImage } from "./SvgImages";
import { colors } from "theme/colors";
import { TypographyStyles } from "theme/typography";
import { CommonStyles } from "theme/common.styles";

interface RatingProps {
    rating: number;
    numberOfRates?: number
}
export const Rating: React.FC<RatingProps> = ({ rating = 0, numberOfRates = 0 }) => {
    const totalStars = 5;
    const stars = Array(totalStars).fill(0)
    return (
        <View style={{ ...CommonStyles.alignCenterRow }}>
            <View style={{ ...CommonStyles.alignCenterRow }}>
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
            {numberOfRates ? (
                <Text style={styles.text}>({numberOfRates})</Text>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        marginLeft: 8,
        color: colors.sky.dark,
    },
});

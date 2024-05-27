import { Image, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import { TypographyStyles } from "theme/typography";
import { colors } from "theme/colors";
import { normalize } from "theme/metrics";

type TLeft = 'icon' | 'image' | 'views'
type TRight = 'text' | 'icon' | 'button' | 'switch'
interface ITables {
    content: string;
    caption?: string;
    left?: string | React.ReactNode;
    leftType?: TLeft;
    right?: string | React.ReactNode;
    rightType?: TRight
}

function renderRight(value: string, right: string | React.ReactNode) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(prevState => !prevState)
    switch (value) {
        case 'text':
            return <Text style={styles.rightStyle}>{value}</Text>;
        case 'button':
            return (
                <Pressable style={styles.button}>
                    <Text style={styles.buttontitle}>{right}</Text>
                </Pressable>
            );
        case 'switch':
            return (
                <Switch
                    trackColor={{ false: '#767577', true: colors.primary.base }}
                    thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                    ios_backgroundColor={colors.primary.base}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            )
        case 'icon':
            return right;
        default:
            break;
    }
}

function renderLeft(value: string, left: any) {
    switch (value) {
        case 'image':
            return <Image source={left} style={styles.image} />
        case 'icon':
            return left
    }
}

export const Tables: React.FC<ITables> = ({
    content, caption, left, right, rightType, leftType }) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.leftContainer}>
                {renderLeft(leftType, left) || null}
            </Pressable>
            <View>
                <Text style={styles.contentStyle}>{content}</Text>
                {caption && (
                    <Text style={(styles.contentStyle, { color: colors.ink.lighter })}> {caption}</Text>
                )}
            </View>
            <Pressable style={[styles.contentStyle, { color: colors.ink.lighter }]}>
                {renderRight(rightType, right) || null}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        paddingVertical: normalize('vertical', 22)
    },
    contentStyle: {
        ...TypographyStyles.RegularTightRegular,
        color: colors.ink.darkest
    },
    rightStyle: {
        ...TypographyStyles.RegularTightSemiBold,
        color: colors.primary.base
    },
    button: {
        backgroundColor: colors.primary.base,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },
    buttontitle: {
        ...TypographyStyles.RegularNoneSemiBold,
        color: colors.white,
        paddingHorizontal: normalize("horizontal", 16),
        paddingVertical: normalize("vertical", 8)
    },
    image: {
        width: normalize('width', 40),
        height: normalize('height', 40)
    },
    hide: {
        opacity: 0
    },
    rightContainer: {
        alignItems: 'flex-end',
        flex: 0.5
    },
    leftContainer: {
        alignItems: 'flex-start',
        flex: 0.1

    }
})

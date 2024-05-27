import React from "react";
import { Insets, Pressable, StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import { normalize } from "theme/metrics";

export interface SvgImageProps extends SvgProps {
    source: any;
    isPressable?: boolean;
    onPress?: () => void;
    pressableStyle?: StyleProp<ViewStyle>
    pressableHitSLop?: null | Insets | number | undefined
}

export const SvgImage: React.FC<SvgImageProps> = ({
    source,
    children,
    isPressable,
    onPress,
    pressableHitSLop,
    ...props
}) => {
    if (!source?.default) {
        return null
    }
    if (props.width) {
        props.width = normalize('width', Number(props.width))
    }
    if (props.height) {
        props.height = normalize('height', Number(props.height))
    }
    if (isPressable) {
        return (
            <Pressable hitSlop={pressableHitSLop} onPress={onPress}>
                {React.createElement(source.default, props, children)}

            </Pressable>
        )
    }
    return React.createElement(source.default, props, children)
}

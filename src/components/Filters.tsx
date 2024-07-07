import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';
import { colors } from 'theme/colors';

interface IPriceBar {
    minPrice: number;
    maxPrice: number;
    selectedMinPrice: number;
    setSelectedMinPrice: React.Dispatch<React.SetStateAction<number>>;
    selectedMaxPrice: number;
    setSelectedMaxPrice: React.Dispatch<React.SetStateAction<number>>;
    onPriceChange?: (priceRange: { min: number; max: number }) => void;
    barColor?: string;
    handleColor?: string;
    barHeight?: number;
}

export const PriceBar: React.FC<IPriceBar> = ({
    minPrice,
    maxPrice,
    selectedMinPrice,
    setSelectedMinPrice,
    selectedMaxPrice,
    setSelectedMaxPrice,
    onPriceChange,
    barColor = colors.ink.lighter,
    handleColor = colors.primary.base,
    barHeight = 5,
}) => {

    const screenWidth = Dimensions.get('window').width;

    const handleMinPanResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            const normalizedX = (gestureState.moveX / screenWidth) * (maxPrice - minPrice);
            const newSelectedMinPrice = Math.max(minPrice, Math.min(selectedMaxPrice, normalizedX + minPrice));
            setSelectedMinPrice(newSelectedMinPrice);
            onPriceChange?.({ min: newSelectedMinPrice, max: selectedMaxPrice });
        },
    });

    const handleMaxPanResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
            const normalizedX = (gestureState.moveX / screenWidth) * (maxPrice - minPrice);
            const newSelectedMaxPrice = Math.min(maxPrice, Math.max(selectedMinPrice, normalizedX + minPrice));
            setSelectedMaxPrice(newSelectedMaxPrice);
            onPriceChange?.({ min: selectedMinPrice, max: newSelectedMaxPrice });
        },
    });

    const leftPercentage = ((selectedMinPrice - minPrice) / (maxPrice - minPrice)) * 100;
    const rightPercentage = ((selectedMaxPrice - minPrice) / (maxPrice - minPrice)) * 100;
    return (
        <View style={styles.container}>
            <View style={[styles.bar, { backgroundColor: barColor, height: barHeight }]}>
                <View
                    style={[
                        styles.selectedRange,
                        {
                            left: `${leftPercentage}%`,
                            width: `${rightPercentage - leftPercentage}%`,
                            backgroundColor: colors.primary.base,
                            height: barHeight,
                        },
                    ]}
                />
            </View>
            <Animated.View
                {...handleMinPanResponder.panHandlers}
                style={[
                    styles.handle,
                    {
                        left: `${leftPercentage}%`,
                    },
                ]}
            >
                <View style={[styles.handleInner, { backgroundColor: handleColor }]} />
            </Animated.View>
            <Animated.View
                {...handleMaxPanResponder.panHandlers}
                style={[
                    styles.handle,
                    {
                        left: `${rightPercentage}%`,
                    },
                ]}
            >
                <View style={[styles.handleInner, { backgroundColor: handleColor }]} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: 40,
        justifyContent: 'center',
        marginBottom: 32,
    },
    bar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        transform: [{ translateY: -2.5 }],
        borderRadius: 2.5,
    },
    selectedRange: {
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
    handle: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -16 }],
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary.base
    },
    handleInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});

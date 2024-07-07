import { NativeSyntheticEvent, Pressable, StyleSheet, Text, TextInputFocusEventData, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { NavigationParamList } from 'types/navigation.types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Routes } from 'router/routes'
import { searchScreenOptions } from 'configs/navigation.configs'

export const SearchScreen: React.FC<
    NativeStackScreenProps<NavigationParamList, Routes.search>> = ({ route, navigation }) => {
        const { onItemPress, items, ...rest } = route.params;
        const [data, setData] = useState<string[]>(items ?? []);

        const onChangeText = useCallback(
            (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
                const text = event.nativeEvent.text;
                const filtered = items?.filter(item => {
                    return item.toLowerCase().includes(text.toLowerCase())
                })
                setData(filtered ?? [])
            },
            [items],
        )
        const renderItems = useCallback(
            ({ item }: { item: any }) => {
                return (
                    <Pressable style={{ padding: 10, }} onPress={() => { onItemPress?.(item); navigation.pop() }}>
                        <Text>{item}</Text>
                    </Pressable>
                );
            },
            [onItemPress, navigation]
        );
        useEffect(() => {
            navigation.setOptions({
                ...searchScreenOptions,
                headerSearchBarOptions: {
                    ...searchScreenOptions.headerSearchBarOptions,
                    onChangeText,
                },
                ...rest,
            });
        }, [navigation, onChangeText, rest]);
        return (
            <FlatList
                data={data}
                renderItem={renderItems}
                contentContainerStyle={{ gap: 32 }}
                contentInsetAdjustmentBehavior='automatic'
            />
        )
    }

const styles = StyleSheet.create({})
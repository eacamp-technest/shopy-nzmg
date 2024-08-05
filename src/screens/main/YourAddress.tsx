import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Navbar } from 'components/Navbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigation.types';
import { Routes } from 'router/routes';
import { colors } from 'theme/colors';
import { Buttons } from 'components/Buttons';
import { Divider } from 'components/Divider';
import { Address } from 'components/Address';
import { normalize } from 'theme/metrics';
import { useUserStore } from 'store/user/user.store';
import { useToast } from 'store/toast';
import { IAddress } from './AddAddress.Screen';

export const YourAddress: React.FC<
    NativeStackScreenProps<NavigationParamList, Routes.yourAddress>
> = ({ navigation }) => {
    const { addresses, actions: { addAddress, selectAddress } } = useUserStore(state => state);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

    const showToast = useToast();

    const renderAddress = (data: IAddress) => {
        const onPress = () => {
            const newSelectedAddressId = selectedAddressId === data.id ? null : data.id;
            setSelectedAddressId(newSelectedAddressId);
            selectAddress(newSelectedAddressId);
        }

        return (
            <View key={data.id}>
                <Address
                    id={data.id}
                    name={data.fullName}
                    address={data.address}
                    selected={data.id === selectedAddressId}
                    onSelect={onPress}
                    onSave={(name, address) => handleSave(data.id, name, address)}
                />
                <Divider height='M' />
            </View>
        );
    }

    const handleSave = (id: string, fullName: string, address: string) => {
        const updatedAddress = { id, address, fullName };
        addAddress(updatedAddress);
        showToast('success', 'Address updated successfully');
    };

    return (
        <View style={styles.container}>
            <Navbar
                onLeftPress={() => navigation.goBack()}
                title="YOUR ADDRESS"
                titleColor={colors.ink.base}
                leftActionType="icon"
                mode='light'
                left={require('assets/vectors/left.svg')}
            />
            {addresses.map(renderAddress)}
            <Buttons types='outlined' text='Add new address' disabled={addresses.length >= 2} onPress={() => navigation.navigate(Routes.addAddress)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: normalize('horizontal', 24)
    },
});

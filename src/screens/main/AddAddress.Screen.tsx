import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { NavigationParamList } from 'types/navigation.types';
import { Routes } from 'router/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from 'theme/colors';
import { Navbar } from 'components/Navbar';
import { InputControlled } from 'components/InputControlled';
import { FormRules } from 'constants/formRules';
import { useForm } from 'react-hook-form';
import { normalize } from 'theme/metrics';
import { TypographyStyles } from 'theme/typography';
import { Divider } from 'components/Divider';
import { Buttons } from 'components/Buttons';
import PhoneInput from 'react-native-phone-number-input';
import { countries, ICountry } from 'data/countries';
import { useUserStore } from 'store/user/user.store';
import { useToast } from 'store/toast';

export interface IAddress {
    fullName: string;
    country?: string;
    mobile?: string;
    address: string;
    id: string;
}

export const AddAddressScreen: React.FC<
    NativeStackScreenProps<NavigationParamList, Routes.addAddress>
> = ({ navigation }) => {

    const showToast = useToast();

    const { addresses, actions: { addAddress } } = useUserStore();
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitted },
    } = useForm<IAddress>({
        defaultValues: {
            fullName: 'Brooklyn Simmons',
            country: 'Azerbaijan',
            address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
            mobile: '055 555 55 55'
        },
    });

    const onSubmit = (data: IAddress) => {
        if (addresses.length >= 2) {
            showToast('warning', 'You can add only two addresses');
            return;
        }
        console.log('Data', data);
        data.id = String(Math.random() * 10000).slice(0, 4);
        addAddress(data);
        showToast('success', 'Address added successfully');
        navigation.navigate(Routes.yourAddress);
        reset();
    };

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef<PhoneInput>(null);
    const [country, setCountry] = useState<ICountry | null>(null);

    return (
        <View style={styles.container}>
            <Navbar
                onLeftPress={() => navigation.goBack()}
                title="ADD ADDRESS"
                titleColor={colors.ink.base}
                leftActionType="icon"
                mode='light'
                left={require('assets/vectors/left.svg')}
                rootStyle={styles.nav}
            />
            <View style={{ paddingBottom: 24 }}>
                <Text style={styles.details}>CONTACT DETAILS</Text>
                <View style={styles.inputs}>
                    <InputControlled
                        control={control}
                        name="fullName"
                        label="Your Name"
                        errorMessage={errors.fullName?.message}
                        rules={FormRules.fullName}
                        type="text"
                        placeholder="Enter Your Name"
                    />
                    <View style={styles.select}>
                        <Text style={styles.label}>Mobile</Text>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="AZ"
                            layout="first"
                            placeholder='Enter Your Mobile'
                            onChangeText={(text) => {
                                setValue(text);
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                            textInputStyle={{ ...TypographyStyles.RegularNoneRegular, color: colors.ink.lighter }}
                            codeTextStyle={{ ...TypographyStyles.InterRegular, color: colors.ink.base }}
                            containerStyle={styles.containerStyle}
                            textContainerStyle={styles.textContainerStyle}
                        />
                    </View>
                </View>
                <Divider height='L' />
                <Text style={styles.details}>ADDRESS DETAILS</Text>
                <View style={styles.inputs}>
                    <InputControlled
                        control={control}
                        type='select'
                        name="country"
                        label="Country"
                        placeholder="Azerbaijan"
                        options={countries}
                        rules={FormRules.country}
                        errorMessage={errors.country?.message}
                        onSelect={(option) => setCountry(option)}
                    />
                    <InputControlled
                        control={control}
                        name="address"
                        type='text'
                        label="Address"
                        rules={FormRules.address}
                        errorMessage={errors.address?.message}
                        placeholder="Enter Your Address"
                    />
                </View>
                <Buttons style={styles.button} text='Deliver to this address' onPress={handleSubmit(onSubmit)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    nav: {
        paddingHorizontal: normalize('horizontal', 24),
    },
    inputs: {
        paddingHorizontal: normalize('horizontal', 24),
        marginBottom: normalize('vertical', 32),
        gap: 24,
    },
    details: {
        ...TypographyStyles.title3,
        paddingHorizontal: normalize('horizontal', 24),
        color: colors.ink.base,
        textTransform: 'uppercase',
        marginBottom: 16,
        marginTop: 32,
    },
    button: {
        marginHorizontal: normalize('horizontal', 24),
        marginTop: 54,
    },
    containerStyle: {
        borderRadius: 8,
        width: 341,
        borderColor: colors.sky.light,
        borderWidth: 1,
    },
    textContainerStyle: {
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingVertical: 8,
    },
    label: {
        ...TypographyStyles.RegularNoneSemiBold,
        color: colors.ink.base,
    },
    select: {
        gap: 12,
    },
});

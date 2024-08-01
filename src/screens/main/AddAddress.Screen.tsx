import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { NavigationParamList } from 'types/navigation.types'
import { Routes } from 'router/routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { colors } from 'theme/colors'
import { Navbar } from 'components/Navbar'
import { InputControlled } from 'components/InputControlled'
import { FormRules } from 'constants/formRules';
import { useForm } from 'react-hook-form'
import { normalize } from 'theme/metrics'
import { TypographyStyles } from 'theme/typography'
import { Divider } from 'components/Divider'
import { Buttons } from 'components/Buttons'
import PhoneInput from 'react-native-phone-number-input'
import { countries, ICountry } from 'data/countries'

interface IAddress {
    fullName: string;
    country?: string;
    mobile?: string;
    address: string
}

export const AddAddressScreen: React.FC<
    NativeStackScreenProps<NavigationParamList, Routes.addAddress>
> = ({ navigation }) => {
    const label = "Country"
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm<IAddress>({
        defaultValues: {
            fullName: 'NGS Group',
            country: 'Azerbaijan',
            address: 'Baku city',
            mobile: '055 555 55 55'
        },
    });

    const onSubmit = (data: IAddress) => {
        console.log('Data', data);
        navigation.navigate(Routes.yourAddress)

    }

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
                    onSelect={(option) => setCountry(option)}
                // onIconPress={setCountry()}
                />
                <InputControlled
                    control={control}
                    name="address"
                    label="Address"
                    // errorMessage={errors.fullName?.message}
                    placeholder="Enter Your Address"
                />
            </View>
            <Buttons style={styles.button} text='Deliver to this address' onPress={handleSubmit(onSubmit)
            } />
        </View>
    )
}

const vectors = {
    down: {
        source: require('../../assets/vectors/chevron-down.svg'),
        width: 24,
        height: 24,
        color: colors.ink.base,
        position: 'right'
    },
    up: {
        source: require('../../assets/vectors/chevron-up.svg'),
        width: 24,
        height: 24,
        color: colors.ink.base,
        position: 'right'
    },
};

const styles = StyleSheet.create({
    container: {
    },
    nav: {
        paddingHorizontal: normalize('horizontal', 24)
    },
    inputs: {
        paddingHorizontal: normalize('horizontal', 24),
        marginBottom: normalize('vertical', 32),
        gap: 24
    },
    details: {
        ...TypographyStyles.title3,
        paddingHorizontal: normalize('horizontal', 24),
        color: colors.ink.base,
        textTransform: 'uppercase',
        marginBottom: 16,
        marginTop: 32
    },
    button: {
        marginHorizontal: normalize('horizontal', 24),
        marginTop: 54
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
        paddingVertical: 8
    },
    label: {
        ...TypographyStyles.RegularNoneSemiBold,
        color: colors.ink.base,
    },
    select: {
        gap: 12
    }
})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
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

interface IAddress {
    fullName: string;
    country?: string;
    mobile?: string;
    address: string
}

export const AddAddressScreen: React.FC<
    NativeStackScreenProps<NavigationParamList, Routes.addAddress>
> = ({ navigation }) => {
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
                <InputControlled
                    control={control}
                    name="mobile"
                    label="Mobile"
                    errorMessage={errors.mobile?.message}
                    rules={FormRules.mobile}
                    type='phone'
                    maxLength={16}
                    keyboardType="number-pad"
                    placeholder="Enter Your Mobile Number"
                />
            </View>
            <Divider height='L' />
        </View>
    )
}

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
    }
})
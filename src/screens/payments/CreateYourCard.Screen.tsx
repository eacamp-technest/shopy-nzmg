import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigation.types';
import { Routes } from 'router/routes';
import { Navbar } from 'components/Navbar';
import { useForm } from 'react-hook-form';
import { InputControlled } from 'components/InputControlled';
import { FormRules } from 'constants/formRules';
import { Buttons } from 'components/Buttons';
import { ICardInputFrom } from 'types/card.types'
import { CardPay } from 'components/specific/CardPay';

export const CreateYourCardScreen: React.FC<
    NativeStackScreenProps<NavigationParamList, Routes.createyourcard>
> = ({ route, navigation }) => {
    const params = route.params as ICardInputFrom | undefined
    const { cardNumber = "", cardHolder = "", cardDate = "" } = params ?? {}
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ICardInputFrom>({
        defaultValues: {
            cardHolder,
            cardNumber,
            cardDate
            // cardNumber: __DEV__ ? '4532 1245 8765 2156' : '',
            // cardHolder: __DEV__ ? 'Brooklyn Simmons' : '',
            // cardDate: __DEV__ ? '12 / 24  /  088' : '',
        },
    });
    const onSubmit = (data: ICardInputFrom) => {
        console.log("Card info added");

    }
    return (
        <View style={styles.root}>
            <Navbar
                leftActionType="icon"
                left={require('../../assets/vectors/chevron-left.svg')}
                title="YOUR CARD"
                onLeftPress={navigation.goBack}
            />
            {/* <CardPay
        // text="Universal Card"
        userName="Brooklyn Simmons"
        cardSave="12/24"
        cardNumber={'4532 1245 8765 2156'}
      /> */}
            {/* <View style={styles.InputView}>
                <InputControlled
                    control={control}
                    name="cardNumber"
                    label="Card Number"
                    errorMessage={errors.cardNumber?.message}
                    rules={FormRules.cardNumber}
                    type="text"
                    placeholder="card Number"
                />
                <InputControlled
                    control={control}
                    name="cardHolder"
                    label="Cardholder Name"
                    errorMessage={errors.cardHolder?.message}
                    rules={FormRules.cardHolder}
                    placeholder="card Holder"
                />
                <InputControlled
                    control={control}
                    name="cardDate"
                    errorMessage={errors.cardDate?.message}
                    rules={FormRules.cardDate}
                    type="text"
                    placeholder="date"
                />
            </View> */}
            <View style={styles.buttonView}>
                <Buttons text='Save' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    InputView: {
        gap: 24,
        paddingTop: 8,
    },
    buttonView: {
        marginTop: 118
    }
});

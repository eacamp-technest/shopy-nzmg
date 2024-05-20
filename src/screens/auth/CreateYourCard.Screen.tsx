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
import Card from '../../assets/images/PaymentCard.png'
import { IAddNewCard } from './AddNewCard.Screen';

// const Card = require('../../assets/images/PaymentCard.png'),

export const CreateYourCardScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.createyourcard>
> = ({ route, navigation }) => {
  const params = route.params as IAddNewCard | undefined
  const { cardNumber = "", cardHolder = "", date = "" } = params ?? {}
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAddNewCard>({
    defaultValues: {
      cardHolder,
      cardNumber,
      date
      // cardNumber: __DEV__ ? '4532 1245 8765 2156' : '',
      // cardHolder: __DEV__ ? 'Brooklyn Simmons' : '',
      // date: __DEV__ ? '12 / 24  /  088' : '',
    },
  });
  const onSubmit = (data: IAddNewCard) => {
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
      <View>
        <Image source={Card} style={styles.CardImage} />
      </View>
      <View style={styles.InputView}>
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
          name="date"
          errorMessage={errors.date?.message}
          rules={FormRules.cardDate}
          type="text"
          placeholder="date"
        />
      </View>
      <View style={styles.buttonView}>
        <Buttons text='Save' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 24
  },
  CardImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  InputView: {
    gap: 24
  },
  buttonView: {
    marginTop: 120
  }
});

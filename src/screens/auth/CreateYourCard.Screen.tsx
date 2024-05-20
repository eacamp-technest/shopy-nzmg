import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Navbar} from 'components/Navbar';
import {useForm} from 'react-hook-form';
import {InputControlled} from 'components/InputControlled';
import {FormRules} from 'constants/formRules';
import {Buttons} from 'components/Buttons';
import {IAddNewCard} from './AddNewCard.Screen';
import {CardPay} from 'components/CardPay';

// const Card = require('../../assets/images/PaymentCard.png'),

export const CreateYourCardScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.createyourcard>
> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<IAddNewCard>({
    defaultValues: {
      cardNumber: __DEV__ ? '4532 1245 8765 2156' : '',
      cardHolder: __DEV__ ? 'Brooklyn Simmons' : '',
      date: __DEV__ ? '12 / 24  /  088' : '',
    },
  });
  const onSubmit = (data: IAddNewCard) => {
    console.log('Card info added');
  };
  return (
    <View style={styles.root}>
      <Navbar
        leftActionType="icon"
        left={require('../../assets/vectors/chevron-left.svg')}
        title="YOUR CARD"
        onLeftPress={navigation.goBack}
      />
      <CardPay
        text="Universal Card"
        userName="Brooklyn Simmons"
        cardSave="12/24"
        cardNumber={'4532 1245 8765 2156'}
      />
      <View style={styles.InputView}>
        <InputControlled
          control={control}
          name="card number"
          label="Card Number"
          errorMessage={errors.cardNumber?.message}
          rules={FormRules.cardNumber}
          type="text"
          placeholder="card number"
        />
        <InputControlled
          control={control}
          name="card name"
          label="Cardholder Name"
          errorMessage={errors.cardHolder?.message}
          rules={FormRules.cardHolder}
          placeholder="Cardholder Name"
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
      <Buttons style={styles.button} text="Save" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    gap: 24,
    flex: 1,
  },

  InputView: {
    paddingTop: 8,
    gap: 24,
  },
  button: {
    marginTop: 94,
  },
});

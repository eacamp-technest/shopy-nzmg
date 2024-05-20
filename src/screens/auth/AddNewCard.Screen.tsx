import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Navbar} from 'components/Navbar';
import {FormRules} from 'constants/formRules';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {InputControlled} from 'components/InputControlled';
import {Routes} from 'router/routes';
import {colors} from 'theme/colors';
import {useForm} from 'react-hook-form';
import {Buttons} from 'components/Buttons';

export interface IAddNewCard {
  cardNumber: string;
  cardHolder: string;
  date: string;
}

export const AddNewCardScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.addnewcard>
> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitted},
  } = useForm<IAddNewCard>();
  const onSubmit = (data: any) => {
    navigation.navigate(Routes.createyourcard, data);
  };
  const navigateToMain = () => navigation.navigate(Routes.test);
  return (
    <View style={styles.root}>
      <Navbar
        type="standard"
        leftActionType="icon"
        left={vectors.leftVector}
        onLeftPress={navigation.goBack}
        rightActionType="text"
        right={'Skip'}
        onRightPress={navigateToMain}
      />
      <Navbar type="large" title="Add New Card" />
      <View style={styles.inputs}>
        <InputControlled
          name="cardNumber"
          control={control}
          label="Card Number"
          errorMessage={errors.cardNumber?.message}
          rules={FormRules.cardNumber}
          type="text"
          keyboardType="numeric"
          placeholder="Enter your card number"
        />
        <InputControlled
          name="cardHolder"
          control={control}
          label="Cardholder Name"
          errorMessage={errors.cardHolder?.message}
          rules={FormRules.cardHolder}
          type="text"
          placeholder="Enter your holder name"
        />
        <InputControlled
          name="date"
          control={control}
          errorMessage={errors.date?.message}
          rules={FormRules.cardDate}
          type="text"
          keyboardType="numeric"
          placeholder="MM/ YY / CVV"
        />
      </View>
      <Buttons
        text="Add Card"
        loading={isSubmitted}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

const vectors = {
  leftVector: {
    icon: require('../../assets/vectors/chevron-left.svg'),
    color: colors.ink.base,
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputs: {
    gap: 24,
    marginTop: 24,
    marginBottom: 32,
  },
});

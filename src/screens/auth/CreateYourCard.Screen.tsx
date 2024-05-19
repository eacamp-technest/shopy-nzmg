import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Navbar} from 'components/Navbar';
import {useForm} from 'react-hook-form';
import {InputControlled} from 'components/InputControlled';
import {FormRules} from 'constants/formRules';
import { Buttons } from 'components/Buttons';
import Card from '../../assets/images/PaymentCard.png';
interface ICreateYourCard{
    card:string,
    cardholder:string,
    date:string
}
export const CreateYourCardScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.createyourcard>
> = ({navigation}) => {
    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
      } = useForm<ICreateYourCard>({
        defaultValues: {
          card: __DEV__ ? '4532 1245 8765 2156' : '',
          cardholder: __DEV__ ? 'Brooklyn Simmons' :'',
          date: __DEV__ ? '12 / 24  /  088' : '',
        },
      });
  return (
    <View style={styles.root}>
      <Navbar
        leftActionType="icon"
        left={require('../../assets/vectors/arrow-left.svg')}
        title="YOUR CARD"
        onLeftPress={navigation.goBack}
      />
      <View>
        <Image source={Card} style={styles.CardImage} />
      </View>
      <View style={styles.InputView}>
      <InputControlled
          control={control}
          name="card"
          label="Card Number"
          errorMessage={errors.card?.message}
          rules={FormRules.card}
          type="text"
          placeholder="card number"
        />
         <InputControlled
          control={control}
          name="card name"
          label="Cardholder Name"
          errorMessage={errors.cardholder?.message}
          rules={FormRules.cardholder}
          placeholder="Cardholder Name"
        />
         <InputControlled
          control={control}
          name="date"
          errorMessage={errors.date?.message}
          rules={FormRules.date}
          type="number"
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
 root:{
    gap:24
 },
  CardImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
  },
  InputView:{
    gap:24
  },
  buttonView:{
    marginTop:120
  }
});

import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Navbar} from 'components/Navbar';
import {useUserStore} from 'store/user/user.store';

export const ChooseCardScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.chooseCard>
> = ({navigation}) => {
  const {cards} = useUserStore(state => state);
  const cardNumber = cards.map(card => card.cardNumber.slice(-4));

  return (
    <View>
      <Navbar
        leftActionType="icon"
        left={require('assets/vectors/left.svg')}
        mode="light"
        title="Choose Payment"
      />
      {cardNumber.map((item, index) => (
        <Navbar
          key={index}
          leftActionType="icon-text"
          onLeftPress={() => console.log(cardNumber)}
          onRightPress={() => console.log('Card')}
          left={{
            text: `Mastercard * * * *${item}`,
            icon: require('assets/vectors/brands.svg'),
          }}
        />
      ))}
    </View>
  );
};

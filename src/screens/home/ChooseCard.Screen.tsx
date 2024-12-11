import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/routes';
import {Navbar} from 'components/Navbar';
import {useUserStore} from 'store/user/user.store';
import {normalize} from 'theme/metrics';
import {colors} from 'theme/colors';
import {Divider} from 'components/Divider';

const avatar = [
  {
    image: require('assets/vectors/bank.svg'),
    title: 'Paypal',
  },
  {
    image: require('assets/vectors/paypal.svg'),
    title: 'Bank Transfer',
  },
];

export const ChooseCardScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.chooseCard>
> = ({navigation}) => {
  const {cards} = useUserStore(state => state);
  const cardNumber = cards.map(card => card.cardNumber.slice(-4));

  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const handleSelect = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <View style={styles.root}>
      <Navbar
        titleColor={colors.ink.base}
        leftActionType="icon"
        left={require('assets/vectors/left.svg')}
        onLeftPress={() => navigation.goBack()}
        mode="light"
        title="Choose Payment"
      />
      {cardNumber.map((item, index) => (
        <Navbar
          key={`card-${index}`}
          leftActionType="icon-text"
          onLeftPress={() => console.log(cardNumber)}
          onRightPress={() => handleSelect(index)}
          check={selectedIndex === index}
          left={{
            text: `Mastercard * * * *${item}`,
            icon: require('assets/vectors/brands.svg'),
          }}
          rightActionType="checkBox"
        />
      ))}
      {avatar.map((item, index) => (
        <Navbar
          key={`avatar-${index}`}
          leftActionType="icon-text"
          onRightPress={() => handleSelect(cardNumber.length + index)}
          check={selectedIndex === cardNumber.length + index}
          left={{
            text: item.title,
            icon: item.image,
          }}
          rightActionType="checkBox"
        />
      ))}
      <Divider height="M" style={styles.divider} />
      <Navbar
        leftActionType="icon-text"
        left={{
          icon: require('../../assets/vectors/plus-cicle.svg'),
          text: 'Add another card',
        }}
        mode="light"
        rightActionType="icon"
        right={require('assets/vectors/chevron-right.svg')}
        onRightPress={() => console.log('Add another card')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: normalize('horizontal', 24),
  },
  divider: {
    marginVertical: 24,
  },
});

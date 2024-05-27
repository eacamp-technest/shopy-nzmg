import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Navbar } from 'components/Navbar';
import { TypographyStyles } from 'theme/typography';
import { TextLink } from 'components/TextLinks';
import { colors } from 'theme/colors';
import { normalize } from 'theme/metrics';
import { Buttons } from 'components/Buttons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigation.types';
import { Routes } from 'router/routes';
import { CommonStyles } from 'theme/common.styles';
import { useUserStore } from 'store/user/user.store';
import { ICardInputFrom } from 'types/card.types';
import { SvgImage } from 'components/SvgImages';

export const PaymentMethodScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.paymentMethod>
> = ({ navigation }) => {

  const { cards, actions: { selectCard }, } = useUserStore(state => state)

  const renderCards = (data: ICardInputFrom) => {
    const onPress = () => {
      selectCard(data.id);
      navigation.navigate(Routes.yourCard)
    }
    return (
      <Pressable key={data.id} style={styles.component} onPress={onPress}>
        <SvgImage color={colors.black} source={require('../../assets/vectors/brands.svg')} />
        <Text style={[TypographyStyles.RegularNormalSemiBold, CommonStyles.flexGrow]}>
          Mastercard * * * * {data.cardNumber.slice(-4)}
        </Text>
        <SvgImage
          isPressable
          onPress={navigateToYourCard}
          source={require('../../assets/vectors/chevron-right.svg')}
          color={colors.ink.darkest}
        />
      </Pressable>
    )
  }

  const navigateToAddNewCard = () => navigation.navigate(Routes.addnewcard);
  const navigateToMain = () => navigation.navigate(Routes.test);
  const navigateToYourCard = () => navigation.navigate(Routes.yourCard);

  return (
    <View style={styles.root}>
      <Navbar
        type='standard'
        leftActionType="icon"
        onLeftPress={() => navigation.goBack()}
        left={require('../../assets/vectors/chevron-left.svg')}
        rightActionType="text"
        onRightPress={navigateToMain}
        right={'Skip'}
      />
      <Navbar type="large" title="payment methods" />
      <View style={styles.container}>
        <Text style={TypographyStyles.RegularNormalSemiBold}>Stored Card</Text>
        <TextLink
          content="You have stored your card to make shopping with Shoppay even smoother. To enroll in Connected card, view card detail. Learn more"
          center={false}
          highlighted={[
            {
              text: 'Learn more',
              callback: () => console.log("Learn more"),
            },
          ]}
        />
        <View style={styles.methods}>
          {cards.map(renderCards)}
          <Pressable style={styles.component}
            onPress={navigateToAddNewCard}>
            <View style={styles.plus}>
              <SvgImage source={require('../../assets/vectors/plus-cicle.svg')} color={colors.white} />
            </View>
            <Text style={[TypographyStyles.RegularNormalSemiBold,
            CommonStyles.flexGrow
            ]}>Add another card</Text>
            <SvgImage
              source={require('../../assets/vectors/chevron-right.svg')}
              isPressable
              onPress={navigateToAddNewCard}
              color={colors.ink.darkest}
            />
          </Pressable>
        </View>
        <View style={styles.container}>
          <Text style={TypographyStyles.RegularNormalSemiBold}>Stored Card</Text>
          <Text style={styles.text}>
            You don’t have a connected bank account.
          </Text>
        </View>
        <Buttons text="Connect a bank account" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: normalize('horizontal', 12),
  },
  text: {
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.lighter,
  },
  container: {
    gap: 12,
    paddingVertical: normalize('vertical', 24),
  },
  plus: {
    width: 40,
    height: 40,
    borderRadius: 99,
    backgroundColor: colors.primary.base,
    justifyContent: 'center',
    alignItems: 'center'
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  methods: {
    gap: 16
  },

  // navbars: {
  //   gap: 16,
  //   paddingVertical: normalize('vertical', 8),
  // },
  // yourCard: {
  //   flex: 0,
  // },
  // addCard: {
  //   flex: 0.6,
  //   gap: 12,
  // },
});
import {StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {Navbar} from 'components/Navbar';
import {TypographyStyles} from 'theme/typography';
import {TextLink} from 'components/TextLinks';
import {colors} from 'theme/colors';
import {Buttons} from 'components/Buttons';
import {Routes} from 'router/routes';
import {CommonStyles} from 'theme/common.styles';
import {useUserStore} from 'store/user/user.store';
import {ICardInputFrom} from 'types/card.types';
import {SvgImage} from 'components/SvgImages';
import {useToast} from 'store/toast';
import {SceneRendererProps} from 'react-native-tab-view';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {normalize} from 'theme/metrics';
import axios from 'axios';
import {Endpoints} from 'services/Endpoints';
import {LocalStorage} from 'store/LocalStorage';

export const PaymentMethodScreen: React.FC<SceneRendererProps> = ({jumpTo}) => {
  const {
    cards,
    navigatedToMain,
    actions: {selectCard, setNavigatedToMain, initUser},
  } = useUserStore(state => state);

  const navigation = useNavigation<NavigationProp<any>>();
  const showToast = useToast();

  const onSubmit = useCallback(async () => {
    try {
      const res = await axios.post(Endpoints.auth.register);
      const {token, user} = res.data;
      console.log(res.data);

      if (navigatedToMain) {
        initUser({...user, token});
        console.log(token, user);

        await LocalStorage.navigatedToMain('set', true);
        await LocalStorage.user('set', {...user, token});
        console.log(token, 'added');
      }
    } catch (error) {
      showToast('error', 'Failed to register. Please try again.');
      console.error('Error details', error.response?.data || error.message);
    }
  }, [initUser, navigatedToMain, showToast]);

  const navigateToMain = useCallback(() => {
    navigation.navigate(Routes.tab);
    setNavigatedToMain(true);
    onSubmit();
  }, [onSubmit, setNavigatedToMain]);

  useEffect(() => {
    console.log('Component re-rendered with navigatedToMain:', navigatedToMain);
  }, [navigatedToMain]);

  const renderCards = useCallback(
    (data: ICardInputFrom) => {
      const onPress = () => {
        selectCard(data.id);
        jumpTo(Routes.yourCard);
      };

      return (
        <Pressable key={data.id} style={styles.component} onPress={onPress}>
          <SvgImage
            color={colors.black}
            source={require('../../assets/vectors/brands.svg')}
          />
          <Text
            style={[
              TypographyStyles.RegularNormalSemiBold,
              CommonStyles.flexGrow,
            ]}>
            Mastercard * * * * {data.cardNumber.slice(-4)}
          </Text>
          <SvgImage
            isPressable
            onPress={() => console.log('...')}
            source={require('../../assets/vectors/chevron-right.svg')}
            color={colors.ink.darkest}
          />
        </Pressable>
      );
    },
    [jumpTo, selectCard],
  );

  const onAddNewMethod = useCallback(() => {
    if (cards.length >= 3) {
      showToast('error', 'You can only store up to 3 cards');
      return;
    }
    jumpTo(Routes.addnewcard);
  }, [cards.length, jumpTo, showToast]);

  return (
    <View style={styles.root}>
      <Navbar
        mode="light"
        type="standard"
        leftActionType="icon"
        onLeftPress={() => navigation.goBack()}
        left={require('../../assets/vectors/chevron-left.svg')}
        rightActionType="text"
        onRightPress={navigateToMain}
        right="Skip"
      />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={TypographyStyles.RegularNormalSemiBold}>
            STORED CARD
          </Text>
          <TextLink
            style={TypographyStyles.RegularNormalRegular}
            content="You have stored your card to make shopping with Shoppay even smoother. To enroll in Connected card, view card detail. Learn more"
            center={false}
            highlighted={[
              {
                text: 'Learn more',
                callback: () => console.log('Learn more'),
              },
            ]}
          />
        </View>
        <View style={styles.methods}>
          {cards.map(renderCards)}
          <Pressable style={styles.component} onPress={onAddNewMethod}>
            <View style={styles.plus}>
              <SvgImage
                source={require('../../assets/vectors/plus-cicle.svg')}
                color={colors.white}
              />
            </View>
            <Text
              style={[
                TypographyStyles.RegularNormalSemiBold,
                CommonStyles.flexGrow,
              ]}>
              {cards.length >= 1 ? 'Add another Card' : 'Add Payment Method'}
            </Text>
            <SvgImage
              source={require('../../assets/vectors/chevron-right.svg')}
              isPressable
              color={colors.ink.darkest}
            />
          </Pressable>
        </View>
        <View style={styles.container}>
          <Text style={TypographyStyles.RegularNormalSemiBold}>
            STORED CARD
          </Text>
          <Text style={styles.text}>
            You don’t have a connected bank account.
          </Text>
        </View>
        <Buttons text="Connect a bank account" onPress={navigateToMain} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: normalize('horizontal', 24),
  },
  textContainer: {
    gap: 12,
    paddingVertical: normalize('vertical', 24),
  },
  text: {
    ...TypographyStyles.RegularNormalRegular,
    color: colors.ink.lighter,
  },
  container: {
    gap: 12,
    paddingVertical: normalize('vertical', 24),
  },
  methods: {
    gap: 16,
  },
  plus: {
    width: 40,
    height: 40,
    borderRadius: 99,
    backgroundColor: colors.primary.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
});

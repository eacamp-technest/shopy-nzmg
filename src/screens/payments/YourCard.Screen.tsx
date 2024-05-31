import { StyleSheet, View } from 'react-native';
import React from 'react';
import { CardPay } from 'components/specific/CardPay';
import { Navbar } from 'components/Navbar';
import { Buttons } from 'components/Buttons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigation.types';
import { Routes } from 'router/routes';
import { CommonStyles } from 'theme/common.styles';
import { useUserStore } from 'store/user/user.store';

export const YourCardScreen: React.FC<
    NativeStackScreenProps<NavigationParamList, Routes.yourCard>
> = ({ navigation }) => {
    const navigateToAddNewCard = () => navigation.navigate(Routes.addnewcard);
    const navigateToPaymentMethod = () => navigation.navigate(Routes.paymentMethod);
    const { selectedCard, actions: { selectCard } } = useUserStore(state => state)
    const onLeftPress = () => {
        navigateToPaymentMethod();
        selectCard(null)
    }
    return (
        <View style={CommonStyles.flex}>
            <Navbar
                type='standard'
                leftActionType="icon"
                onLeftPress={onLeftPress}
                left={require('../../assets/vectors/chevron-left.svg')}
                title="YOUR CARD"
            />
            <View style={styles.root}>
                <CardPay
                    cardNumber={selectedCard?.cardNumber}
                    cardHolder={selectedCard?.cardHolder}
                    cardDate={selectedCard?.cardDate}
                />
                <Buttons
                    onPress={navigateToAddNewCard}
                    text="Add new card"
                    types={'outlined'}
                    disabled={YourCardScreen.length >= 2}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    root: {
        gap: 32,
        flex: 1
    }
});

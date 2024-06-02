import { StyleSheet, View } from 'react-native';
import React from 'react';
import { CardPay } from 'components/specific/CardPay';
import { Navbar } from 'components/Navbar';
import { Buttons } from 'components/Buttons';
import { Routes } from 'router/routes';
import { CommonStyles } from 'theme/common.styles';
import { useUserStore } from 'store/user/user.store';
import { SceneRendererProps } from 'react-native-tab-view';

export const YourCardScreen: React.FC<SceneRendererProps> = ({ jumpTo }) => {
    const { selectedCard, cards, actions: { selectCard } } = useUserStore(state => state)
    const onLeftPress = () => {
        jumpTo(Routes.paymentMethod)
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
                    onPress={() => jumpTo(Routes.addnewcard)}
                    text="Add new card"
                    types={'outlined'}
                    disabled={cards.length >= 2}
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

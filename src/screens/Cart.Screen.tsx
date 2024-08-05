import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { NavigationParamList } from 'types/navigation.types';
import { Routes } from 'router/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Navbar } from 'components/Navbar';
import { colors } from 'theme/colors';
import { IProduct, ProductCard } from 'components/ProductCard';
import { Divider } from 'components/Divider';
import { SvgImage } from 'components/SvgImages';
import { TypographyStyles } from 'theme/typography';
import { CommonStyles } from 'theme/common.styles';
import { Input } from 'components/Input';
import { Buttons } from 'components/Buttons';
import { useCartStore } from 'store/cart/cart.store';

export const CartScreen: React.FC<
    NativeStackScreenProps<NavigationParamList, Routes.cart>
> = ({ navigation }) => {
    const { carts, subTotalPrice, actions: { deleteItemFromCart } } = useCartStore(state => state);
    const [address, setAddress] = useState('');

    const calculateShippingCost = (items: IProduct[]) => {
        return items.reduce((total, item) => {
            const itemShippingCost = (item.category === "women's clothing" || item.category === "men's clothing") ? 23 : 30;
            return total + itemShippingCost;
        }, 0);
    };

    const shippingCost = calculateShippingCost(carts);
    const totalPrice = subTotalPrice + shippingCost;

    const totalItems = carts.reduce((acc, item) => acc + (item.quantity || 1), 0);

    const renderInCart = useCallback(
        ({ item }: { item: IProduct }) => (
            <ProductCard
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
                horizontal={true}
                size='s'
                isCounter={true}
                onPress={() => navigation.navigate(Routes.productDetail, { product: item })}
                onBinPress={() => {
                    console.log("delete");
                    deleteItemFromCart(item);
                }}
            />
        ),
        [deleteItemFromCart, navigation]
    );

    return (
        <View style={styles.container}>
            <Navbar
                onLeftPress={() => navigation.goBack()}
                title="CART"
                rightActionType="icon"
                titleColor={colors.ink.base}
                right={require('assets/vectors/edit.svg')}
                leftActionType="icon"
                mode='light'
                left={require('assets/vectors/left.svg')}
            />
            <FlatList
                numColumns={1}
                data={carts}
                keyExtractor={(item: IProduct) => item.id.toString()}
                renderItem={renderInCart}
                showsVerticalScrollIndicator={false}
                style={{ padding: 24, maxHeight: 240 }}
            />
            <Divider height='L' />
            <View>
                <Navbar
                    left={'PAYMENT TYPE'}
                    leftTextStyle={TypographyStyles.title3}
                    leftActionType="text"
                    rightActionType="text"
                    onRightPress={() => console.log("change all")}
                    right={'Change'}
                />
                <Pressable
                    onLayout={() => console.log('render')}
                    style={styles.component}
                    onPress={() => console.log("pressed")}
                >
                    <SvgImage
                        color={colors.black}
                        source={require('../assets/vectors/brands.svg')}
                    />
                    <Text
                        style={[
                            TypographyStyles.RegularNormalSemiBold,
                            CommonStyles.flexGrow,
                        ]}
                    >
                        Mastercard * * * * 4213
                    </Text>
                    <SvgImage
                        isPressable
                        onPress={() => console.log("payment")
                        }
                        source={require('../assets/vectors/chevron-right.svg')}
                        color={colors.ink.darkest}
                    />
                </Pressable>
                <Text style={styles.text}>DELIVERY ADDRESS</Text>
                <Input onIconPress={() => navigation.navigate(Routes.addAddress)} value={address} setValue={setAddress} inputStyle={{ flexDirection: 'row-reverse', marginBottom: 32 }} placeholder='Add postal address' icon={require('../assets/vectors/chevron-right.svg')} />
                <Divider height="M" />
                <View style={styles.subtotal}>
                    <Text>Subtotal ({totalItems} items)</Text>
                    <Text>${subTotalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.shipping}>
                    <Text>Shipping</Text>
                    <Text>${shippingCost.toFixed(2)}</Text>
                </View>
                <View style={styles.total}>
                    <Text>Total</Text>
                    <Text>${totalPrice.toFixed(2)}</Text>
                </View>
                <Buttons text='Purchase' />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24
    },
    component: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
    },
    text: {
        ...TypographyStyles.title3,
        color: colors.ink.base,
        paddingTop: 32,
        paddingBottom: 18,
    },
    subtotal: {
        ...CommonStyles.alignCenterJustifyBetweenRow,
        marginTop: 24,
    },
    shipping: {
        ...CommonStyles.alignCenterJustifyBetweenRow,
        marginTop: 8
    },
    total: {
        ...CommonStyles.alignCenterJustifyBetweenRow,
        marginVertical: 16
    },
});


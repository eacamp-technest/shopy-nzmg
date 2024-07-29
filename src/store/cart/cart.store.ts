import { create } from 'zustand'
import { ICartStore, CartItem } from './cart.types'
import { LocalStorage } from 'store/LocalStorage'
import { StorageKeys } from 'types/localstorage.types'

const initial: Omit<ICartStore, 'actions'> = {
    subTotalPrice: 0,
    carts: [],
}

export const useCartStore = create<ICartStore>((set, get) => ({
    ...initial,
    actions: {
        initialize: () => {
            const carts = LocalStorage.carts('get')
            const subTotalPrice = LocalStorage.subTotalPrice('get')
            set({ carts, subTotalPrice })
        },
        addToCart: (item: CartItem) => {
            const isExist = get().carts.find(info => info.id === item.id);

            if (!isExist) {
                const updated = [...get().carts, item]
                set({ carts: updated });
                LocalStorage.carts('set', updated)
            }
        },
        updateItemQuantity: (id: number, quantity: number) => {
            const newCarts = get().carts.map(cartItem =>
                cartItem.id === id ? { ...cartItem, quantity } : cartItem
            );
            const newSubTotalPrice = newCarts.reduce((acc, cartItem) => acc + (cartItem.price || 0) * (cartItem.quantity || 1), 0);
            set({ carts: newCarts, subTotalPrice: newSubTotalPrice })
        },
        calculateSubTotalPrice: () => {
            const newTotalPrice = get().carts.reduce((acc, cartItem) => acc + (cartItem.price || 0) * (cartItem.quantity || 1), 0);
            set({ subTotalPrice: newTotalPrice })
            LocalStorage.subTotalPrice('set', newTotalPrice)
        },
        deleteItemFromCart: (item: CartItem) => {
            const newCarts = get().carts.filter(data => data.id !== item.id);
            const newTotalPrice = newCarts.reduce((acc, carItem) => acc + (carItem.price || 0) * (carItem.quantity || 1), 0)
            set({ carts: newCarts, subTotalPrice: newTotalPrice })

            if (newCarts.length === 0) {
                LocalStorage.clean(StorageKeys.carts)
            } else {
                LocalStorage.carts('set', newCarts)
            }
        },
        reset: () => set({ ...initial })
    }
}))

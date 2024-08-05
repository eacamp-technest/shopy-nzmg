import { create } from 'zustand';
import { IUserStore } from './user.types';
import { LocalStorage } from 'store/LocalStorage';
import { StorageKeys } from 'types/localstorage.types';
import { useToastStore } from 'store/toast/toast.store';

const { showToast } = useToastStore.getState().actions;

const initial: Omit<IUserStore, 'actions'> = {
    user: null,
    selectedCard: null,
    selectedAddress: null,
    addresses: [],
    cards: []
}

export const useUserStore = create<IUserStore>((set, get) => ({
    ...initial,
    actions: {
        initialize: () => {
            const cards = LocalStorage.cards('get');
            const user = LocalStorage.user('get');
            const addresses = LocalStorage.addresses('get') || [];
            set({ user, cards, addresses });
        },
        logout: () => {
            LocalStorage.clean([StorageKeys.user, StorageKeys.cards]);
            get().actions.reset();
            showToast('success', 'Logged out successfully');
        },
        initUser: user => {
            set({ user });
            LocalStorage.user('set', user);
        },
        addCard: card => {
            const isExist = get().cards.find(info => info.id === card.id);
            if (!isExist) {
                const updated = [...get().cards, card];
                set({ cards: updated });
                LocalStorage.cards('set', updated);
            }
        },
        selectCard: id => {
            if (id === null) {
                return set({ selectedCard: null });
            }
            const card = get().cards.find(data => data.id === id);
            set({ selectedCard: card });
        },
        selectAddress: id => {
            if (id === null) {
                return set({ selectedAddress: null });
            }
            const addressData = get().addresses.find(data => data.id === id);
            set({ selectedAddress: addressData });
        },
        removeCard: id => {
            const state = get().cards.filter(data => data.id !== id);
            set({ cards: state });
            if (state.length === 0) {
                LocalStorage.clean(StorageKeys.cards);
            } else {
                LocalStorage.cards('set', state);
            }
        },
        addAddress: addressData => {
            const updatedAddresses = [...get().addresses.filter(addr => addr.id !== addressData.id), addressData];
            set({ addresses: updatedAddresses });
            LocalStorage.addresses('set', updatedAddresses);
        },
        reset: () => set({ ...initial })
    }
}));

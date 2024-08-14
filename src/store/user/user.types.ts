import { IAddress } from "screens/main/AddAddress.Screen";
import { ICardInputFrom } from "types/card.types";
import { IUser } from "types/user";

interface IUserStoreActions {
    addCard: (card: ICardInputFrom) => void;
    removeCard: (id: string) => void;
    selectCard: (id: string | null) => void;
    selectAddress: (id: string | null) => void;
    initialize: () => void;
    initUser: (user: IUser) => void;
    reset: () => void;
    logout: () => void;
    addAddress: (address: IAddress) => void;
    setNavigatedToMain: (navigated: boolean) => void;  // Add this
}

export interface IUserStore {
    user: IUser | null;
    cards: ICardInputFrom[];
    addresses: IAddress[];
    selectedCard: ICardInputFrom | null;
    selectedAddress: IAddress | null;
    navigatedToMain: boolean;  // Add this
    actions: IUserStoreActions;
}


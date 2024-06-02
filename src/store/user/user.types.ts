import { ICardInputFrom } from "types/card.types";

interface IUserStoreActions {
    addCard: (card: ICardInputFrom) => void;
    removeCard: (id: string) => void;
    selectCard: (id: string | null) => void;
    initialize: () => void;
    reset: () => void
}

export interface IUserStore {
    user: null | undefined;
    cards: ICardInputFrom[];
    selectedCard: ICardInputFrom | null;
    actions: IUserStoreActions
}
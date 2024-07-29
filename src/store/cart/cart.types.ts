export type CartItem = {
    id: number;
    price: number;
    size?: string | null;
    color?: string | null;
    image?: string;
    title?: string;
    quantity?: number;
    category?: string
}

interface ICartStoreActions {
    initialize: () => void;
    addToCart: (item: CartItem) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    deleteItemFromCart: (item: CartItem) => void;
    calculateSubTotalPrice: () => void;
    reset: () => void;
}

export interface ICartStore {
    carts: CartItem[];
    subTotalPrice: number;
    actions: ICartStoreActions;
}

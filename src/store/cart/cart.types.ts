import {IProduct} from 'components/ProductCard';

interface ICartStoreActions {
  initialize: () => void;
  addToCart: (item: IProduct) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  deleteItemFromCart: (item: IProduct) => void;
  calculateSubTotalPrice: () => void;
  reset: () => void;
}

export interface ICartStore {
  carts: IProduct[];
  subTotalPrice: number;
  actions: ICartStoreActions;
}

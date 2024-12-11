import {IProduct} from 'components/ProductCard';

interface ISavedItemsActions {
  initialize: () => void;
  addToSaved: (item: IProduct) => void;
  deleteItemFromSaved: (item: IProduct) => void;
  reset: () => void;
}

export interface ISavedItemsStore {
  savedItems: IProduct[];
  actions: ISavedItemsActions;
}

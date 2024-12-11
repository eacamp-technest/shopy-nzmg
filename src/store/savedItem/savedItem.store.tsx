import {create} from 'zustand';
import {ISavedItemsStore} from './saveItem.types';
import {LocalStorage} from 'store/LocalStorage';
import {StorageKeys} from 'types/localstorage.types';
import {IProduct} from 'components/ProductCard';

const initial: Omit<ISavedItemsStore, 'actions'> = {
  savedItems: [],
};

export const useSavedItemsStore = create<ISavedItemsStore>((set, get) => ({
  ...initial,
  actions: {
    initialize: () => {
      const savedItems = LocalStorage.savedItems('get');
      set({savedItems});
    },
    addToSaved: (item: IProduct) => {
      const isExist = get().savedItems.find(info => info.id === item.id);

      if (!isExist) {
        const updated = [...get().savedItems, item];
        set({savedItems: updated});
        LocalStorage.savedItems('set', updated);
      }
    },
    deleteItemFromSaved: (item: IProduct) => {
      const newItems = get().savedItems.filter(data => data.id !== item.id);
      set({savedItems: newItems});

      if (newItems.length === 0) {
        LocalStorage.clean(StorageKeys.savedItems);
      } else {
        LocalStorage.savedItems('set', newItems);
      }
    },
    reset: () => set({...initial}),
  },
}));

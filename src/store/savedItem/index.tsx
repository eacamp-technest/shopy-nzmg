import {useSavedItemsStore} from './savedItem.store';
export const useSavedItemStoreActions = () =>
  useSavedItemsStore(state => state.actions);

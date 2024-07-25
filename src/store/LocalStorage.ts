import { MMKV } from "react-native-mmkv";
import { ICardInputFrom } from "types/card.types";
import { StorageKeys, StorageMethodsKeys, TFunctionalMethod } from "types/localstorage.types";
import { IUser } from "types/user";
import { CartItem } from "./cart/cart.types";

const storage = new MMKV();

export class LocalStorage {
    private static set(
        key: StorageKeys,
        method: StorageMethodsKeys,
        data?: any
    ) {
        if (['string', 'number', 'boolean'].includes(method)) {
            storage.set(key, data as string | number | boolean);
        } else if (['object', 'array'].includes(method)) {
            storage.set(key, JSON.stringify(data));
        } else {
            throw new Error("LocalStorage method isn't supported");
        }
    }

    public static clean(key: StorageKeys | StorageKeys[] | 'all') {
        if (key === 'all') {
            storage.clearAll();
        } else if (Array.isArray(key)) {
            key.forEach(k => storage.delete(k));
        } else {
            storage.delete(key);
        }
    }

    public static cards(method: TFunctionalMethod, data?: ICardInputFrom[]) {
        if (method === 'get') {
            const cards = storage.getString(StorageKeys.cards);
            return cards ? JSON.parse(cards) : [];
        }
        this.set(StorageKeys.cards, 'array', data);
    }

    public static user(method: TFunctionalMethod, data?: IUser) {
        if (method === 'get') {
            const user = storage.getString(StorageKeys.user);
            return user ? JSON.parse(user) : null;
        }
        this.set(StorageKeys.user, 'object', data);
    }

    public static carts(method: TFunctionalMethod, data?: CartItem[]) {
        if (method === 'get') {
            const carts = storage.getString(StorageKeys.carts);
            return carts ? JSON.parse(carts) : [];
        }
        this.set(StorageKeys.carts, 'array', data);
    }

    public static totalPrice(method: TFunctionalMethod, data?: number) {
        if (method === 'get') {
            const totalPrice = storage.getString(StorageKeys.totalPrice);
            return totalPrice ? JSON.parse(totalPrice) : 0;
        }
        this.set(StorageKeys.totalPrice, 'number', data);
    }
}

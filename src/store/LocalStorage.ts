import { MMKV } from "react-native-mmkv";
import { ICardInputFrom } from "types/card.types";
import { StorageKeys, StorageMethodsKeys, TFunctionalMethod } from "types/localstorage.types";
import { IUser } from "types/user";
import { IProduct } from "components/ProductCard";
import { IAddress } from "screens/main/AddAddress.Screen";

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

    public static token(method: TFunctionalMethod, data?: string) {
        if (method === 'get') {
            return storage.getString(StorageKeys.token) || null;
        }
        this.set(StorageKeys.token, 'string', data);
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
    public static addresses(method: TFunctionalMethod, data?: IAddress[]) {
        if (method === 'get') {
            const addresses = storage.getString(StorageKeys.addresses);
            return addresses ? JSON.parse(addresses) : [];
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

    public static carts(method: TFunctionalMethod, data?: IProduct[]) {
        if (method === 'get') {
            const carts = storage.getString(StorageKeys.carts);
            return carts ? JSON.parse(carts) : [];
        }
        this.set(StorageKeys.carts, 'array', data);
    }
    public static savedItems(method: TFunctionalMethod, data?: IProduct[]) {
        if (method === 'get') {
            const savedItems = storage.getString(StorageKeys.savedItems);
            return savedItems ? JSON.parse(savedItems) : [];
        }
        this.set(StorageKeys.savedItems, 'array', data);
    }

    public static subTotalPrice(method: TFunctionalMethod, data?: number) {
        if (method === 'get') {
            const totalPrice = storage.getString(StorageKeys.totalPrice);
            return totalPrice ? JSON.parse(totalPrice) : 0;
        }
        this.set(StorageKeys.totalPrice, 'number', data);
    }
    public static navigatedToMain(method: TFunctionalMethod, data?: boolean) {
        if (method === 'get') {
            const navigatedToMain = storage.getString(StorageKeys.navigatedToMain);
            return navigatedToMain ? JSON.parse(navigatedToMain) : false;
        }
        this.set(StorageKeys.navigatedToMain, 'boolean', data);
    }
}
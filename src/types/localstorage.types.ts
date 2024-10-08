export type StorageMethodsKeys = 'string' | 'number' | 'boolean' | 'object' | 'array'
export type StorageMethods = string | number | boolean | object | any[]
export type TFunctionalMethod = 'set' | 'get'
export enum StorageKeys {
    cards = 'cards',
    user = 'user',
    carts = 'carts',
    totalPrice = 'totalPrice',
    subTotalPrice = 'subTotalPrice',
    addresses = 'addresses',
    isVerified = 'isVerified',
    navigatedToMain = 'navigatedToMain',
    token = 'token',
    savedItems = 'savedItems'
}

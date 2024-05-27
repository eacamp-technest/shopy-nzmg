interface ICardStoreActions {
    increment: () => void;
    decrement: () => void;
    reset: () => void
}

export interface ICardStore {
    count: number | null;
    name: string | null;
    surname: string | null
    actions: ICardStoreActions
}
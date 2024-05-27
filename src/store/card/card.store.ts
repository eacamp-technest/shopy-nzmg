import { create } from "zustand";
import { ICardStore } from "./card.types";

const initial: Omit<ICardStore, "actions"> = {
    name: "Gulnaz",
    surname: "Bakhshiyeva",
    count: 0

}

export const usecardStore = create((set) => ({
    ...initial,
    actions: {
        reset: () => set({ ...initial }),
        increment: () => set(state => ({ count: (state.count ?? 0) + 1 })),
        decrement: () => set(state => ({ count: (state.count ?? 0) - 1 })),
    }
}))
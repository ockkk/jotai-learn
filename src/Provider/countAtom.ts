import { atom } from "jotai";

export const countSymbol_1 = Symbol('count1');
export const countSymbol_2 = Symbol('count2');
export const countSymbol_3 = Symbol('count3');

export const countAtom = atom<number>(0);

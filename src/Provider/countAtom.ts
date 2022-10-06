import { atom } from "jotai";

export const countSymbol = Symbol('count');

export const countAtom = atom<number>(0);

import { atom } from "jotai";

const countAtom = atom(0);
const countReadAtom = atom((get) => get(countAtom));
const countWriteAtom = atom<null, number>(null, (get, set, update) => {
  set(countAtom, get(countAtom) + update);
});

countAtom.onMount = (setAtom) => {
  setAtom((number) => {
    // atom이 mount 될 때 +2
    console.log("mount: ", number);
    return number + 2;
  });
  return () => {
    // atom이 unmount 될 때 0으로 초기화
    console.log("unmount!!");
    setAtom(0);
  };
};


import { ComponentType } from "react";
import { atom, Provider, useAtom } from "jotai";

const nameAtom = atom<string>("");

export function JotaiProviderHOC<T extends JSX.IntrinsicAttributes>(
  Component: ComponentType<T>
): React.FunctionComponent<T> {
  return (props: T) => {
    return <Component {...props} />;
  };
}

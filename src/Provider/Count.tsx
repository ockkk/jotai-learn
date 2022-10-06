import { useAtom } from "jotai";
import { countAtom, countSymbol } from "./countAtom";
import { JotaiProviderHOC } from "./JotaiProviderHOC";

export function Count() {
  const [count, setCount] = useAtom(countAtom);

  const onPlusCount = () => {
    setCount(count + 1);
  };

  const onMinusCount = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={onPlusCount}>+</button>
      <button onClick={onMinusCount}>-</button>
    </div>
  );
}

export const ProviderCount = JotaiProviderHOC(Count, countSymbol);

import { useAtom } from "jotai";
import { countAtom, countSymbol_1 } from "./countAtom";
import { JotaiProviderHOC } from "./JotaiProviderHOC";

interface CountProps {
  symbol?: symbol;
}

export function Count({ symbol }: CountProps) {
  const [count, setCount] = useAtom(countAtom, symbol);

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

export const ProviderCountSymbol1 = JotaiProviderHOC(Count, countSymbol_1);

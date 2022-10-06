import { useAtom } from "jotai";
import { countAtom, countSymbol } from "./countAtom";

export function ProviderCount() {
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

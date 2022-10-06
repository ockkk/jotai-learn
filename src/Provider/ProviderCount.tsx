import { useAtom } from "jotai";
import { countAtom, countSymbol } from "./countAtom";
import { JotaiProviderHOC } from "./JotaiProviderHOC";

interface CountProps {
  name: string;
}

function Count({}: CountProps) {
  const [count, setCount] = useAtom(countAtom, countSymbol);

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

export const ProviderCount = JotaiProviderHOC<CountProps>(Count, countSymbol);

export function test() {
  return <ProviderCount name="123123" />;
}

import { atom, Provider, useAtom, useAtomValue } from "jotai";
import { Count, ProviderCountSymbol1 } from "./Count";
import { countSymbol_1, countSymbol_2 } from "./countAtom";

export function Count1Module() {
  return (
    <div>
      <h3>ProviderCountSymbol1</h3>
      <ProviderCountSymbol1 />
      <ProviderCountSymbol1 />
    </div>
  );
}

export function Count2Module() {
  return (
    <div>
      <h3>countSymbol_1</h3>
      <Provider scope={countSymbol_1}>
        <Count symbol={countSymbol_1} />
        <p>countSymbol_2</p>
        <Provider scope={countSymbol_2}>
          <Count symbol={countSymbol_1} />
          <Count symbol={countSymbol_2} />
        </Provider>
      </Provider>
    </div>
  );
}

const test1Atom = atom("");
// const test1Atom =
const test2Atom = atom("");

export function Test() {
  const [test1, setTest1] = useAtom(test1Atom);

  const onChange = () => {
    setTest1("변경");
  };

  return (
    <div>
      {test1}
      <button onClick={onChange}>클릭</button>
    </div>
  );
}

export function Test2() {
  const [test1, setTest1] = useAtom(test1Atom);

  const onChange = () => {
    setTest1("변경");
  };

  return (
    <div>
      <h3>test2</h3>
      <div>{test1}</div>
      <button onClick={onChange}>클릭</button>
    </div>
  );
}
export function ProviderLeaning() {
  return (
    <div>
      <Test />
      <Provider scope={"123"}>
        <Test2 />
      </Provider>
      <Count1Module />
      <Count2Module />
    </div>
  );
}

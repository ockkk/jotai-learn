import { ComponentType } from "react";
import { Provider } from "jotai";

/**
 * @param WrappedComponent 반환할 component
 * @param symbolName jotai Provider에 적용항 symbol
 */

export function JotaiProviderHOC<P>(
  WrappedComponent: ComponentType<P>,
  symbol: symbol
) {
  return (props: P & JSX.IntrinsicAttributes) => {
    return (
      <Provider scope={symbol}>
        <WrappedComponent {...props} />;
      </Provider>
    );
  };
}

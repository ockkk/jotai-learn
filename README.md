## jotai를 공부하는 레퍼지터리 입니다.

1. provider 에 대해서
   [provider 그림 설명](https://excalidraw.com)

   - scope를 설정해주지 않으면 Provider 내부의 컴포넌트는 완전 독립된 상태가 된다.
     Provider 외부의 상태값과 분리가 되는 것이다.
     상위 컴포넌트의 atom값도 받아올 수 없다.

   - 같은 레벨의 Provider일 경우 scope가 같아도 개별로 돌아간다.
     즉 하위 레벨에 있을 경우만 scope 공유가 가능하다.

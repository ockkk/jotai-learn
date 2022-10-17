## jotai를 공부하는 레퍼지터리 입니다.

Jotai는 일본어로 상태라는 뜻이며 타입스크립트를 기반으로한 atomic 상태 관리 라이브러리 입니다.
Jotai는 context api 를 기반으로 만들어졌으며 context api 가진 리렌더링 최적화에 대한 문제를 해결 하기 위해 만들어 졌습니다.

1. atom 에 대해서
   jotai에서 사용되는 atom은 상태의 조각이라는 개념으로 4가지 타입으로 나누어볼 수 있습니다.

- primitive atom (원시 아톰)

```tsx
// 원시 아톰의 함수와 type
function atom<Value>(initialValue: Value): PrimitiveAtom<Value>;

// 사용할때
const countAtom = atom<number>(0);
```

- read-only atom (읽기 아톰)
  읽기 아톰은 React의 rendering 단계에서 호출이 되기 때문에 순수해야 합니다. (동일한 입력에 대하여 항상 동일한 결과값을 반환해야 합니다.)

```tsx
function atom<Value>(
  read: (get: Getter) => Value | Promise<Value>
): Atom<Value>;

const countAtom = atom<number>(0);
const countRead = atom<number>((get) => get(countAtom));
```

- writable derived atom (읽기,쓰기 아톰)

```tsx
function atom<Value, Update>(
  read: (get: Getter) => Value | Promise<Value>,
  write: (get: Getter, set: Setter, update: Update) => void | Promise<void>
): WritableAtom<Value, Update>

const countAtom = atom<number>(0);

// update 는 set 할때 넘겨 받을 인자 값을 말한다.
// number type으로 지정한다면 number type의 인자를 받을 수 있다.
const countReadWrite = atom<number, number>(
  (get) => get(countAtom),
  (get, set, update) => {
    set(countAtom, get((countAtom) * 2);
  }
);
```

- write-only derived atom (쓰기 아톰)
  쓰기 함수는 처음 호출은 호출부에서 실행이 되고 이후 부터는 useEffect에서 호출이 됩니다. 따라서 render에서 읽기 함수를 호출하면 안됩니다.

```tsx
function atom<Value, Update>(
  read: Value,
  write: (get: Getter, set: Setter, update: Update) => void | Promise<void>
): WritableAtom<Value, Update>;

const countAtom = atom<number>(0);
const countWrite = atom<null, number>(null, (get, set) => {
  set(countAtom, get(countAtom));
});
```

2. 실 사용시 자주 사용할것 샅은 utils

### **atomWithStorage**

3가지 인자를 받습니다.

- key (required): storage에 저장할 키 값
- initailValue (required): storage에 저장할 값
- storage (optional): 좀 더 알아봐야함

```tsx
import { useAtom } from 'jotai'
import { atomWithStorage, RESET } from 'jotai/utils';

const countAtom = atomWithStorage('count', 0);

function Count() {
  const [count, setCount] = useAtom(countAtom);

  // 저장소에서 항목을 삭제하려는 경우 RESET 기호를 사용하면 됩니다.
  const onClickResetCount = () => {
    setCount(RESET);
  };

  return (
    <div>{count}</div>
    <button onClick={onClickResetCount}>Reset</button>
  )
}
```

### atomwithReset, useResetAtom

**atomwithReset**은 \*\*\*\*기본값으로 재설정이 가능한 atom 입니다. `RESET` 을 사용하여 기본값으로 재설정하는 것도 가능합니다.

**useResetAtom**은 재설정 가능한 원자를 초기값으로 재설정 합니다.

```tsx
import { atomWithReset, useResetAtom } from 'jotai/utils'

const userListAtom = atomWithReset([{name: 'Atom', age: '2'}]);

function UserList() {
  const resetUserList = useResetAtom(userListAtom);

  const onResetUserList = () => {
    resetUserList();
  }

  return (
    ...
    <button onClick={onResetUserList}>Reset</button>
  )
}
```

### selectAtom

선택자에 의해 선택된 원자 값의 파생된 원자값을 생성합니다.

기존 원자의 값이 변경 될 때마다 equalFn에서 이전 값과 비교하여 값이 변경 되었다고 판단하는 경우 원자를 업데이트 합니다.

equalFn은 optional한 값으로 기본 값은 참조값을 비교 합니다. 객체를 파생했을 경우 deepEqual 함수를 넣어주어야 re-render가 발생하지 않습니다.

user atom의 값이 변경 될 때 마다 birth객체가 새롭게 생성이 됩니다. 이때 birth 객체의 값이 이전과 동일한 값일 경우 selectAtom의 equalFn의 기본값은 참조값만을 비교하기 때문에 불필요한 렌더링이 발생하게 됩니다.

deepEqual을 하도록 equalFn의 값을 정의해 주면 불필요한 렌더링을 막을 수 있습니다.

deepEqual 함수를 직접 만들어도 되지만 저희는 lodash를 사용하기 때문에 lodash의 isEqual 함수를 사용하는것이 좋을것 같습니다.

```tsx
function selectAtom<Value, Slice>(
  anAtom: Atom<Value>,
  selector: (v: Value) => Slice,
  equalityFn: (a: Slice, b: Slice) => boolean = Object.is
): Atom<Slice>;

const user = {
  name: "Atom",
  age: 2,
  gender: "male",
  birth: {
    year: "2021",
    month: "10",
    day: "15",
  },
};

const personAtom = atom(user);

// 객체의 값을 select 하는 경우 깊은 비교를 해야 새로운 객체가 반환 될 경우
// 값이 동일 하다면 리랜더가 일어나지 않습니다.
// 기본값은 참조값을 비교 한다.
const nameAtom = selectAtom(personAtom, (person) => person.name, equalityFn);
```

3. provider 에 대해서
   [provider 그림 설명](https://excalidraw.com)

   - jotai는 기본적으로 Provider-less모드를 제공한다.

   - scope를 설정해주지 않으면 Provider 내부의 컴포넌트는 완전 독립된 상태가 된다.
     Provider 외부의 상태값과 분리가 되는 것이다.
     상위 컴포넌트의 atom값도 받아올 수 없다.

   - 같은 레벨의 Provider일 경우 scope가 같아도 개별로 돌아간다.
     즉 하위 레벨에 있을 경우만 scope 공유가 가능하다.

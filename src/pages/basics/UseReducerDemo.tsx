import React, { useReducer } from 'react';
import CodeBlock from '@/components/CodeBlock';
const code = `import React, { useReducer } from 'react';

// 1️⃣ 定义 reducer 函数（接收旧状态和 action，返回新状态）
function counterReducer(state: number, action: { type: string }): number {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return 0;
    default:
      return state;
  }
}

// 2️⃣ 页面组件
export default function CounterWithReducer() {
  // 3️⃣ 使用 useReducer（传入 reducer 和初始值）
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>useReducer 经典计数器示例</h2>
      <p>当前计数：{count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>加一</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>减一</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </div>
  );
}
`;
// 1️⃣ 定义 reducer 函数（接收旧状态和 action，返回新状态）
function counterReducer(state: number, action: { type: string }): number {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return 0;
    default:
      return state;
  }
}

// 2️⃣ 页面组件
export default function CounterWithReducer() {
  // 3️⃣ 使用 useReducer（传入 reducer 和初始值）
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>useReducer 经典计数器示例</h2>
      <p>当前计数：{count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>加一</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>减一</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
      <CodeBlock title="当前组件源码" code={code} />
    </div>
  );
}

import React, { useState, useCallback } from 'react';
import CodeBlock from '@/components/CodeBlock';
const code = `
import React, { useState, useCallback } from 'react';

// ✅ 子组件 - 接收一个回调函数作为 prop
const Child = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log('🎯 子组件渲染了');
  return (
    <div>
      <button onClick={onClick}>子组件按钮</button>
    </div>
  );
});

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // ❗️如果不使用 useCallback，每次父组件渲染都会新建一个 handleClick 函数，子组件也会被迫更新
  //   在这个前提下，子组件如果是用 React.memo 包裹的，只要 props 不变，它就不会重新渲染。
  const handleClick = useCallback(() => {
    console.log('子组件按钮点击');
  }, []); // ✅ 只有依赖项变了（这里是空数组）才会重新创建函数

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h2>useCallback 示例：避免子组件重复渲染</h2>

      <p>count：{count}</p>
      <button onClick={() => setCount(count + 1)}>更新 count</button>

      <p>other：{other}</p>
      <button onClick={() => setOther(other + 1)}>更新 other</button>

      <hr />

      {/* 👇 子组件只在 handleClick 引用变化时才会重新渲染 */}
      <Child onClick={handleClick} />
    </div>
  );
}
`;
// ✅ 子组件 - 接收一个回调函数作为 prop
const Child = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log('🎯 子组件渲染了');
  return (
    <div>
      <button onClick={onClick}>子组件按钮</button>
    </div>
  );
});

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // ❗️如果不使用 useCallback，每次父组件渲染都会新建一个 handleClick 函数，子组件也会被迫更新
  //   在这个前提下，子组件如果是用 React.memo 包裹的，只要 props 不变，它就不会重新渲染。
  const handleClick = useCallback(() => {
    console.log('子组件按钮点击');
  }, []); // ✅ 只有依赖项变了（这里是空数组）才会重新创建函数

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h2>useCallback 示例：避免子组件重复渲染</h2>

      <p>count：{count}</p>
      <button onClick={() => setCount(count + 1)}>更新 count</button>

      <p>other：{other}</p>
      <button onClick={() => setOther(other + 1)}>更新 other</button>

      <hr />

      {/* 👇 子组件只在 handleClick 引用变化时才会重新渲染 */}
      <Child onClick={handleClick} />

      <CodeBlock code={code} language="tsx" />
    </div>
  );
}

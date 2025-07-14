import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';

const code = `import { useState, useRef } from 'react';

export default function UseRefDemo() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count); // 🧠 useRef 保存当前 count 值

  return (
    <div>
      <h2>useRef 使用示例</h2>
      <p>当前计数: {count}</p>
      <button onClick={() => {
        setCount(count + 1);
        countRef.current = count + 1; // 🧠 每次更新也更新 ref 值
      }}>
        增加计数
      </button>
    </div>
  );
}`;

export default function UseRefDemo() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>useRef 使用示例</h2>
      <p>当前计数: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        增加计数
      </button>
      <CodeBlock title="当前组件源码" code={code} />
    </div>
  );
}

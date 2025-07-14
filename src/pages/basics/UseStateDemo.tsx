import { useState, useRef } from 'react';
import CodeBlock from '@/components/CodeBlock';

const code = `import { useState, useRef } from 'react';

export default function UseRefDemo() {
  // 组件状态：每次点击按钮时 +1，导致组件重新渲染
  const [count, setCount] = useState(0);

  // useRef：记录按钮被点击的总次数（不会触发组件重新渲染）
  const clickRef = useRef(0);

  /**
   * 每次点击按钮：
   * - 更新状态 count，触发页面重新渲染
   * - 更新 clickRef.current，但不会导致页面重新渲染
   */
  const handleClick = () => {
    setCount(count + 1);
    clickRef.current += 1;
  };

  return (
    <div>
      <h2>useRef 使用示例</h2>
      <p>当前 count 状态：{count}</p>
      <p>useRef 记录的点击次数：{clickRef.current}</p>

      <button onClick={handleClick}>增加计数</button>
    </div>
  );
}
`;
export default function UseRefDemo() {
  // 组件状态：每次点击按钮时 +1，导致组件重新渲染
  const [count, setCount] = useState(0);

  // useRef：记录按钮被点击的总次数（不会触发组件重新渲染）
  const clickRef = useRef(0);

  /**
   * 每次点击按钮：
   * - 更新状态 count，触发页面重新渲染
   * - 更新 clickRef.current，但不会导致页面重新渲染
   */
  const handleClick = () => {
    setCount(count + 1);
    clickRef.current += 1;
  };

  return (
    <div>
      <h2>useRef 使用示例</h2>
      <p>当前 count 状态：{count}</p>
      <p>useRef 记录的点击次数：{clickRef.current}</p>
      <button onClick={handleClick}>增加计数</button>
      <CodeBlock title="当前组件源码" code={code} />;
    </div>
  );
}

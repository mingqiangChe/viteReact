import React, { useRef, useState, useEffect } from 'react';
import CodeBlock from '@/components/CodeBlock';

const code = `import React, { useRef, useState, useEffect } from 'react';

export default function UseRefDemo() {
  // 1️⃣ 用于记录点击次数（不会触发组件重新渲染）
  const clickCountRef = useRef(0);

  // 2️⃣ 用于操作 DOM（让输入框聚焦）
  const inputRef = useRef<HTMLInputElement>(null);

  // 3️⃣ 普通状态（用于显示点击次数）
  const [renderCount, setRenderCount] = useState(0);

  // 4️⃣ 页面加载后让输入框自动获取焦点
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClick = () => {
    clickCountRef.current += 1; // ⭐记录次数，但不会触发组件更新 属于属性页面不会监听所以不会触发
    setRenderCount((c) => c + 1); // 强制触发一次渲染（为了看效果）
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>useRef 经典使用案例</h2>

      {/* 输入框：页面加载后自动聚焦 */}
      <input ref={inputRef} placeholder="我会自动聚焦" />

      <br /><br />

      <button onClick={handleClick}>点击我</button>

      <p>点击按钮次数（ref 记录）：{clickCountRef.current}</p>
      <p>页面渲染次数（useState 触发）：{renderCount}</p>
    </div>
  );
}
`;

export default function UseRefDemo() {
  // 1️⃣ 用于记录点击次数（不会触发组件重新渲染）
  const clickCountRef = useRef(0);

  // 2️⃣ 用于操作 DOM（让输入框聚焦）
  const inputRef = useRef<HTMLInputElement>(null);

  // 3️⃣ 普通状态（用于显示点击次数）
  const [renderCount, setRenderCount] = useState(0);

  // 4️⃣ 页面加载后让输入框自动获取焦点
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClick = () => {
    clickCountRef.current += 1; // 记录次数，但不会触发组件更新
    setRenderCount((c) => c + 1); // 强制触发一次渲染（为了看效果）
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>useRef 经典使用案例</h2>

      {/* 输入框：页面加载后自动聚焦 */}
      <input ref={inputRef} placeholder="我会自动聚焦" />

      <br />
      <br />

      <button onClick={handleClick}>点击我</button>

      <p>点击按钮次数（ref 记录）：{clickCountRef.current}</p>
      <p>页面渲染次数（useState 触发）：{renderCount}</p>
      <CodeBlock title="当前组件源码" code={code} />
    </div>
  );
}

import { useState, useMemo } from 'react';
import CodeBlock from '@/components/CodeBlock';
const code = `import React, { useState, useMemo } from 'react';

// 🔁 模拟一个“计算开销较大”的质数判断函数
function isPrime(n: number): boolean {
  console.log('[📡] 正在执行质数计算...');
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function PrimeChecker() {
  // 📌 number 表示要检查是否为质数的数字
  const [number, setNumber] = useState(1);

  // 📌 text 是一个无关的输入框，用于模拟页面中“其他状态的改变”
  const [text, setText] = useState('');

  /**
   * ✅ useMemo 核心点：
   *  - 计算 isPrime(number) 是一个“开销大的函数”
   *  - 我们只希望在  number  改变时才重新运行该函数
   *  - 如果用户修改的是  text ，我们就不要重新判断质数
   *
   * 🔁 useMemo 返回的结果会被“记忆”，直到依赖项 [number] 改变为止
   */
  const isNumberPrime = useMemo(() => {
    return isPrime(number);
  }, [number]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>useMemo 示例：质数判断</h2>

      {/* 输入数字：我们要判断这个数字是不是质数 */}
      <div style={{ marginBottom: '1rem' }}>
        <label>
          请输入一个数字：
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
          />
        </label>
      </div>

      {/* 展示质数判断的结果 */}
      <p>
        {number} 是质数吗？ 👉{' '}
        <strong>{isNumberPrime ? '✅ 是质数' : '❌ 不是质数'}</strong>
      </p>

      <hr />

      {/* 这个输入框不会影响质数判断，但如果不用 useMemo，仍会导致重新计算 */}
      <div>
        <label>
          输入其他信息（不影响质数判断）：
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <p>你输入的是：{text}</p>
      </div>
    </div>
  );
}
`;
// 🔁 模拟一个“计算开销较大”的质数判断函数
function isPrime(n: number): boolean {
  console.log('[📡] 正在执行质数计算...');
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function PrimeChecker() {
  // 📌 number 表示要检查是否为质数的数字
  const [number, setNumber] = useState(1);

  // 📌 text 是一个无关的输入框，用于模拟页面中“其他状态的改变”
  const [text, setText] = useState('');

  /**
   * ✅ useMemo 核心点：
   *  - 计算 `isPrime(number)` 是一个“开销大的函数”
   *  - 我们只希望在 `number` 改变时才重新运行该函数
   *  - 如果用户修改的是 `text`，我们就不要重新判断质数
   *
   * 🔁 useMemo 返回的结果会被“记忆”，直到依赖项 [number] 改变为止
   */
  const isNumberPrime = useMemo(() => {
    return isPrime(number);
  }, [number]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>useMemo 示例：质数判断</h2>

      {/* 输入数字：我们要判断这个数字是不是质数 */}
      <div style={{ marginBottom: '1rem' }}>
        <label>
          请输入一个数字：
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
          />
        </label>
      </div>

      {/* 展示质数判断的结果 */}
      <p>
        {number} 是质数吗？ 👉{' '}
        <strong>{isNumberPrime ? '✅ 是质数' : '❌ 不是质数'}</strong>
      </p>

      <hr />

      {/* 这个输入框不会影响质数判断，但如果不用 useMemo，仍会导致重新计算 */}
      <div>
        <label>
          输入其他信息（不影响质数判断）：
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <p>你输入的是：{text}</p>
      </div>
      <CodeBlock title="当前组件源码" code={code} />
    </div>
  );
}

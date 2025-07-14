import { useEffect, useState, useRef } from 'react';
import CodeBlock from '@/components/CodeBlock';
const code = `import { useEffect, useState, useRef } from 'react';

export default function UseEffectDemo() {
  // 保存当前是否是进入页面后的 10 秒倍数（例如第10、20、30秒）
  const [isMultipleOf10, setIsMultipleOf10] = useState(false);

  // 当前的时间，每秒更新一次，用于展示和计算
  const [time, setTime] = useState(new Date());

  // 记录页面加载时的时间，只记录一次，且不会因重新渲染而变化
  const startTimeRef = useRef(new Date());

  /**
   * 定时器 effect：每秒更新一次当前时间
   * useEffect 第一个参数是执行逻辑，第二个参数是依赖数组（为空代表只执行一次）
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // 每 1 秒更新一次

    // 返回清理函数，组件卸载时取消定时器
    return () => clearInterval(timer);
  }, []);

  /**
   * 时间判断 effect：每次当前时间更新时，重新计算差值
   * 如果时间差是 10 的倍数，就更新状态为 true
   */
  useEffect(() => {
    // 当前时间和进入页面时的时间的秒数差
    const diffSeconds = Math.floor(
      (time.getTime() - startTimeRef.current.getTime()) / 1000
    );

    // 判断是否为 10 的倍数
    setIsMultipleOf10(diffSeconds % 10 === 0);
  }, [time]); // 每次 time 更新时执行

  return (
    <div>
      <h2>useEffect 依赖触发示例</h2>
      <p>进入时间：{startTimeRef.current.toLocaleTimeString()}</p>
      <p>当前时间：{time.toLocaleTimeString()}</p>
      <p>是否为 10 的倍数秒数：{isMultipleOf10 ? '✅ 是' : '❌ 否'}</p>
    </div>
  );
}
`;
export default function UseEffectDemo() {
  // 保存当前是否是进入页面后的 10 秒倍数（例如第10、20、30秒）
  const [isMultipleOf10, setIsMultipleOf10] = useState(false);

  // 当前的时间，每秒更新一次，用于展示和计算
  const [time, setTime] = useState(new Date());

  // 记录页面加载时的时间，只记录一次，且不会因重新渲染而变化
  const startTimeRef = useRef(new Date());

  /**
   * 定时器 effect：每秒更新一次当前时间
   * useEffect 第一个参数是执行逻辑，第二个参数是依赖数组（为空代表只执行一次）
   */
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // 每 1 秒更新一次

    // 返回清理函数，组件卸载时取消定时器
    return () => clearInterval(timer);
  }, []);

  /**
   * 时间判断 effect：每次当前时间更新时，重新计算差值
   * 如果时间差是 10 的倍数，就更新状态为 true
   */
  useEffect(() => {
    // 当前时间和进入页面时的时间的秒数差
    const diffSeconds = Math.floor(
      (time.getTime() - startTimeRef.current.getTime()) / 1000
    );

    // 判断是否为 10 的倍数
    setIsMultipleOf10(diffSeconds % 10 === 0);
  }, [time]); // 每次 time 更新时执行

  return (
    <div>
      <h2>useEffect 依赖触发示例</h2>
      <p>进入时间：{startTimeRef.current.toLocaleTimeString()}</p>
      <p>当前时间：{time.toLocaleTimeString()}</p>
      <p>是否为 10 的倍数秒数：{isMultipleOf10 ? '✅ 是' : '❌ 否'}</p>
      <CodeBlock title="当前组件源码" code={code} />
    </div>
  );
}

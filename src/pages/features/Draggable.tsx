import CodeBlock from '@/components/CodeBlock';
const code = `
import { useState, useRef, useEffect } from 'react';
// useState：记录位置数据
// useRef：记录拖拽状态和 DOM 引用
// useEffect：监听和清理全局事件

export default function DraggableBox() {
  // 盒子当前位置，初始放在左上角 (0,0)
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 初始坐标
  // 是否正在拖拽
  const dragging = useRef(false);
  // 记录鼠标点击时的位置与盒子左上角的偏移量
  const dragOffset = useRef({ x: 0, y: 0 });
  // 盒子容器的 ref，用于计算边界限制
  const containerRef = useRef<HTMLDivElement>(null);

  // position 控制盒子的位置（会触发重新渲染）
  // dragging.current 在拖动过程中为 true
  // dragOffset 是记录你鼠标点在哪（避免鼠标点总是方块左上角）
  // containerRef 是为了获取容器的位置和大小，用来限制拖拽边界

  // 鼠标按下时触发，开始拖拽
  function handleMouseDown(e: any) {
    dragging.current = true;
    const box = e.target.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - box.left,
      y: e.clientY - box.top,
    };
    // 阻止默认事件，避免选中文字
    e.preventDefault();
  }

  // 鼠标移动时触发，更新盒子位置
  function handleMouseMove(e: any) {
    if (!dragging.current) return;

    const containerDom = containerRef.current;
    if (!containerDom) return;

    const container = containerDom.getBoundingClientRect();

    // 计算新位置，减去偏移量，使鼠标相对盒子固定点拖动
    let newX = e.clientX - container.left - dragOffset.current.x;
    let newY = e.clientY - container.top - dragOffset.current.y;

    // 限制拖拽范围在容器内（可选）
    const maxX = container.width - 100; // 盒子宽度100px
    const maxY = container.height - 100; // 盒子高度100px

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > maxX) newX = maxX;
    if (newY > maxY) newY = maxY;

    setPosition({ x: newX, y: newY });

    //     鼠标移动中，实时计算新的位置（鼠标位置减去容器起点减去偏移）

    // 限制边界：不能小于 0、不能超过最大宽高

    // 更新 setPosition，自动让盒子更新位置
  }

  // 鼠标松开时，停止拖拽
  function handleMouseUp() {
    dragging.current = false;
  }

  // 绑定全局鼠标事件，防止鼠标移出盒子时拖拽失效
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    //     在组件加载时绑定鼠标移动和抬起事件
    // 一定要加清理函数，避免内存泄漏或重复绑定
  }, []);

  return (
    //  外层是一个容器 div，设置 ref 和 position: relative
    // 内层是可以拖动的小方块，position: absolute 依赖 left/top 定位
    // 鼠标按下时触发 onMouseDown 开始拖动
    <div
      ref={containerRef}
      style={{
        width: '400px',
        height: '300px',
        border: '2px solid #333',
        position: 'relative',
        userSelect: 'none',
        margin: '20px auto',
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#409eff',
          borderRadius: '8px',
          position: 'absolute',
          left: position.x,
          top: position.y,
          cursor: 'grab',
        }}
      />
    </div>
  );
}
`;

import { useState, useRef, useEffect } from 'react';
// useState：记录位置数据
// useRef：记录拖拽状态和 DOM 引用
// useEffect：监听和清理全局事件

export default function DraggableBox() {
  // 盒子当前位置，初始放在左上角 (0,0)
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 初始坐标
  // 是否正在拖拽
  const dragging = useRef(false);
  // 记录鼠标点击时的位置与盒子左上角的偏移量
  const dragOffset = useRef({ x: 0, y: 0 });
  // 盒子容器的 ref，用于计算边界限制
  const containerRef = useRef<HTMLDivElement>(null);

  // position 控制盒子的位置（会触发重新渲染）
  // dragging.current 在拖动过程中为 true
  // dragOffset 是记录你鼠标点在哪（避免鼠标点总是方块左上角）
  // containerRef 是为了获取容器的位置和大小，用来限制拖拽边界

  // 鼠标按下时触发，开始拖拽
  function handleMouseDown(e: any) {
    dragging.current = true;
    const box = e.target.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - box.left,
      y: e.clientY - box.top,
    };
    // 阻止默认事件，避免选中文字
    e.preventDefault();
  }

  // 鼠标移动时触发，更新盒子位置
  function handleMouseMove(e: any) {
    if (!dragging.current) return;

    const containerDom = containerRef.current;
    if (!containerDom) return;

    const container = containerDom.getBoundingClientRect();

    // 计算新位置，减去偏移量，使鼠标相对盒子固定点拖动
    let newX = e.clientX - container.left - dragOffset.current.x;
    let newY = e.clientY - container.top - dragOffset.current.y;

    // 限制拖拽范围在容器内（可选）
    const maxX = container.width - 100; // 盒子宽度100px
    const maxY = container.height - 100; // 盒子高度100px

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > maxX) newX = maxX;
    if (newY > maxY) newY = maxY;

    setPosition({ x: newX, y: newY });

    //     鼠标移动中，实时计算新的位置（鼠标位置减去容器起点减去偏移）

    // 限制边界：不能小于 0、不能超过最大宽高

    // 更新 setPosition，自动让盒子更新位置
  }

  // 鼠标松开时，停止拖拽
  function handleMouseUp() {
    dragging.current = false;
  }

  // 绑定全局鼠标事件，防止鼠标移出盒子时拖拽失效
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    //     在组件加载时绑定鼠标移动和抬起事件
    // 一定要加清理函数，避免内存泄漏或重复绑定
  }, []);

  return (
    // 外层是一个容器 div，设置 ref 和 position: relative
    // 内层是可以拖动的小方块，position: absolute 依赖 left/top 定位
    //  鼠标按下时触发 onMouseDown 开始拖动
    <div>
      <div
        ref={containerRef}
        style={{
          width: '400px',
          height: '300px',
          border: '2px solid #333',
          position: 'relative',
          userSelect: 'none',
          margin: '20px auto',
        }}
      >
        <div
          onMouseDown={handleMouseDown}
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: '#409eff',
            borderRadius: '8px',
            position: 'absolute',
            left: position.x,
            top: position.y,
            cursor: 'grab',
          }}
        />
      </div>
      <CodeBlock title="当前组件源码" code={code} />
    </div>
  );
}

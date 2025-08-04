import { useState, useRef, useEffect } from 'react';

export default function DraggableBox() {
  // 盒子当前位置，初始放在左上角 (0,0)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 是否正在拖拽
  const dragging = useRef(false);
  // 记录鼠标点击时的位置与盒子左上角的偏移量
  const dragOffset = useRef({ x: 0, y: 0 });

  // 盒子容器的 ref，用于计算边界限制
  const containerRef = useRef(null);

  // 鼠标按下时触发，开始拖拽
  function handleMouseDown(e) {
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
  function handleMouseMove(e) {
    if (!dragging.current) return;

    const container = containerRef.current.getBoundingClientRect();

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
  }, []);

  return (
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

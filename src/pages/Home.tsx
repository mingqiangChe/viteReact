import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>React 练习项目首页</h1>

      <h2>基础 Hooks 练习</h2>
      <ul>
        <li>
          <Link to="/basics/useref">useRef 示例</Link>
        </li>
        <li>
          <Link to="/basics/usereducer">useReducer 示例</Link>
        </li>
      </ul>

      <h2>功能模块练习</h2>
      <ul>
        <li>
          <Link to="/features/draggable">拖拽组件</Link>
        </li>
        <li>
          <Link to="/features/todolist">TodoList</Link>
        </li>
      </ul>
    </div>
  );
}

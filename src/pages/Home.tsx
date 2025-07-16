import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>React 练习</h1>

      <h2>基础 Hooks 练习</h2>
      <ul>
        <li>
          <Link to="/basics/useState">useState 示例</Link>
        </li>
        <li>
          <Link to="/basics/useEffect">useEffect 示例</Link>
        </li>
        <li>
          <Link to="/basics/useRef">useRef 示例</Link>
        </li>
        <li>
          <Link to="/basics/useContext">useContext 示例</Link>
        </li>
        <li>
          <Link to="/basics/useReducer">useReducer 示例</Link>
        </li>
        <li>
          <Link to="/basics/useMemo">useMemo 示例</Link>
        </li>
        <li>
          <Link to="/basics/useCallback">useCallback 示例</Link>
        </li>
      </ul>

      <h2>功能模块练习</h2>
      <ul>
        <li>
          <Link to="/features/dragGable">拖拽组件</Link>
        </li>
        <li>
          <Link to="/features/todoList">TodoList</Link>
        </li>
      </ul>
    </div>
  );
}

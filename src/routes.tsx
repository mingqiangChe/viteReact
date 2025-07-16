import type { RouteObject } from 'react-router-dom';
// import { Outlet } from 'react-router-dom'; // 子元素占位符 如果已配置就不需要加

import Home from './pages/Home';
import About from './pages/About';

// 基础 Hooks 练习
import UseStateDemo from './pages/basics/UseStateDemo';
import UseEffectDemo from './pages/basics/useEffectDemo';
import UseContextDemo from './pages/basics/UseContextDemo';
import UseRefDemo from './pages/basics/UseRefDemo';
import UseReducerDemo from './pages/basics/UseReducerDemo';
import UseMemoDemo from './pages/basics/useMemoDemo';
import UseCallbackDemo from './pages/basics/UseCallbackDemo';

// 功能模块练习
import Draggable from './pages/features/Draggable';
import TodoList from './pages/features/TodoList';

import BasicsLayout from './pages/basics/BasicsLayout';

const routes: RouteObject[] = [
  { path: '/', element: <Home />, index: true },
  { path: '/about', element: <About /> },
  {
    path: '/basics',
    element: (
      <div>
        <BasicsLayout title="基础 Hooks 练习" />
        {/* <Outlet /> */}
      </div>
    ),
    children: [
      { path: 'useState', element: <UseStateDemo /> },
      { path: 'useEffect', element: <UseEffectDemo /> },
      { path: 'useContext', element: <UseContextDemo /> },
      { path: 'useRef', element: <UseRefDemo /> },
      { path: 'useReducer', element: <UseReducerDemo /> },
      { path: 'useMemo', element: <UseMemoDemo /> },
      { path: 'useCallback', element: <UseCallbackDemo /> },
    ],
  },
  {
    path: '/features',
    element: (
      <div>
        <BasicsLayout title="功能模块练习" />
        {/* <Outlet /> */}
      </div>
    ),
    children: [
      { path: 'dragGable', element: <Draggable /> },
      { path: 'todoList', element: <TodoList /> },
    ],
  },
];

export default routes;

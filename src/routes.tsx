import type { RouteObject } from 'react-router-dom';
import { Outlet, Route } from 'react-router-dom'; // ✅ 必须添加

import Home from './pages/Home';
import About from './pages/About';

// 基础 Hooks 练习
import UseRefDemo from './pages/basics/UseRefDemo';
import UseReducerDemo from './pages/basics/UseReducerDemo';

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
        <Outlet />
      </div>
    ),
    children: [
      { path: 'useref', element: <UseRefDemo /> },
      { path: 'usereducer', element: <UseReducerDemo /> },
    ],
  },
  {
    path: '/features',
    element: (
      <div>
        <BasicsLayout title="功能模块练习" />
        <Outlet />
      </div>
    ),
    children: [
      { path: 'draggable', element: <Draggable /> },
      { path: 'todolist', element: <TodoList /> },
    ],
  },
];

export default routes;

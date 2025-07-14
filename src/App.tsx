import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import type { RouteObject } from 'react-router-dom';
import type { ReactNode } from 'react';

function renderRoutes(routes: RouteObject[]): ReactNode {
  return routes.map((route: RouteObject, index) => {
    if (route.index) {
      // ✅ 索引路由：只能设置 index + element，不能设置 path
      return <Route key={`index-${index}`} index element={route.element} />;
    }

    // ✅ 普通路由
    return (
      <Route
        key={route.path ?? `path-${index}`}
        path={route.path}
        element={route.element}
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
}

export default function App() {
  return <Routes>{renderRoutes(routes)}</Routes>;
}

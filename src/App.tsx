import { Routes, Route, Outlet } from 'react-router-dom';
import routes from './routes';

function renderRoutes(routes) {
  return routes.map(({ path, element, children, index }) => (
    <Route key={path} path={path} element={element} index={index}>
      {children && renderRoutes(children)}
    </Route>
  ));
}

export default function App() {
  return <Routes>{renderRoutes(routes)}</Routes>;
}

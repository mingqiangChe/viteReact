import { useNavigate, Outlet } from 'react-router-dom';

interface BasicsLayoutProps {
  title: string;
}
export default function BasicsLayout({ title }: BasicsLayoutProps) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>{title}</h2>
      <h3
        onClick={() => navigate(-1)}
        style={{ cursor: 'pointer', color: 'blue' }}
      >
        返回上一页
      </h3>
      <Outlet />
    </div>
  );
}

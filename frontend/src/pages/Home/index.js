import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import hooks from '~/hooks';

const Home = () => {
  const refresh = hooks.useRefreshToken();
  const navigate = useNavigate();
  const { auth } = hooks.useAuth();

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (!auth) navigate(config.routes.login, { replace: true });
    const currentRole = parseInt(localStorage.getItem('currentRole'));
    if (currentRole) {
      const roleName = Object.keys(config.roles).find((key) => config.roles[key] === currentRole);
      navigate(`/home/${roleName}`, { replace: true });
    }
  }, [auth]);

  return <div>Home</div>;
};

export default Home;

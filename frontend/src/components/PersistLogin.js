import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import hooks from '~/hooks';
import Loading from '~/components/Loading';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = hooks.useRefreshToken();
  const { auth } = hooks.useAuth();
  const [ persist ] = hooks.useLocalStorage( 'persist', false );
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    // eslint-disable-next-line
  }, [isLoading]);

  return <>{!persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />}</>;
};

export default PersistLogin;

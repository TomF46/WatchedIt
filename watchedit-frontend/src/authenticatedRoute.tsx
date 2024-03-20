import { Navigate, RouteProps } from 'react-router-dom';
import useIsAuthenticated from './hooks/useIsAuthenticated';

const AuthenticatedRoute = ({ children }: RouteProps) => {
  const userIsAuthenticated = useIsAuthenticated();
  if (!userIsAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default AuthenticatedRoute;

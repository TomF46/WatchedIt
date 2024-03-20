import { Navigate, RouteProps } from 'react-router-dom';
import { useAppSelector } from './redux/store';

const AuthenticatedRoute = ({ children }: RouteProps) => {
  const userIsAuthenticated = useAppSelector(
    (state) => state.authentication.tokens != null,
  );
  if (!userIsAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default AuthenticatedRoute;

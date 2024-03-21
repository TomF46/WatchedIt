import { useAppSelector } from '../redux/store';

function useIsAuthenticated(): boolean {
  return useAppSelector((state) => state.authentication.tokens != null);
}

export default useIsAuthenticated;

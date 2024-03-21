import { useAppSelector } from '../redux/store';

function useIsAdmin(): boolean {
  return useAppSelector((state) => state.admin.isAdmin);
}

export default useIsAdmin;

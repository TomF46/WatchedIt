import { useAppSelector } from '../redux/store';

function useNotifictionCount(): number {
  return useAppSelector((state) => state.notifications.count);
}

export default useNotifictionCount;

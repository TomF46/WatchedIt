import useCurrentUserId from './useCurrentUserId';

function usePageTargetUserId(idProp: number | null): number | null {
  const currentUserId = useCurrentUserId();
  return idProp ? idProp : currentUserId; // If no id prop is provided e.g.  /profile/likes then return current users id, if prop is provided e.g. /profile/1/likes return the user id.
}

export default usePageTargetUserId;

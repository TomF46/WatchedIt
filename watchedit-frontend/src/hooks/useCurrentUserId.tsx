import { useAppSelector } from "../redux/store";

function useCurrentUserId() : number | null{
    return useAppSelector((state) =>
    state.authentication.tokens ? state.authentication.tokens.id : null,
  );
}

export default useCurrentUserId;
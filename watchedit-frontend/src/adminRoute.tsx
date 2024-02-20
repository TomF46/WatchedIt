import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { getCurrentUserIsAdmin } from "./api/usersApi";
import { useQuery } from "@tanstack/react-query";
import { RouteProps } from "./types/routeProps";

const AdminRoute = ({ children }: RouteProps) => {
  const { isLoading, data } = useQuery({
    queryKey: ["is-admin"],
    queryFn: () => getCurrentUserIsAdmin(),
  });

  return (
    <>
      {!isLoading && (
        <>{data!.isAdmin ? children : <Navigate to="/404" replace />}</>
      )}
    </>
  );
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;

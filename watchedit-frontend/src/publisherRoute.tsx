import { Navigate } from "react-router-dom";
import { getCurrentUserIsPublisher } from "./api/usersApi";
import { useQuery } from "@tanstack/react-query";
import { RouteProps } from "./types/routeProps";

const PublisherRoute = ({ children } : RouteProps) => {
  const { isLoading, data } = useQuery({
    queryKey: ["is-publisher"],
    queryFn: () => getCurrentUserIsPublisher(),
  });

  return (
    <>
      {!isLoading && (
        <>{data.canPublish ? children : <Navigate to="/404" replace />}</>
      )}
    </>
  );
};

export default PublisherRoute;

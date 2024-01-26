import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { getCurrentUserIsPublisher } from "./api/usersApi";
import { useQuery } from "@tanstack/react-query";

const PublisherRoute = ({ children }) => {
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

PublisherRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublisherRoute;

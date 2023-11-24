import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Navigate } from "react-router-dom";
import { getCurrentUserIsPublisher } from "./api/usersApi";

const PublisherRoute = ({ children }) => {
  const [isPublisher, setIsPublisher] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getCurrentUserIsPublisher()
      .then((res) => {
        setIsPublisher(res.canPublish);
        setIsChecked(true);
      })
      .catch(() => {
        //If call fails then assume they are not publisher
        setIsChecked(true);
      });
  }, []);

  return (
    <>
      {isChecked && (
        <>{isPublisher ? children : <Navigate to="/404" replace />}</>
      )}
    </>
  );
};

PublisherRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublisherRoute;

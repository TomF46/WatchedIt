import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function NotFound(){
    return (
        <div className="not-found-page">
            <p className="text-center text-primary text-4xl mt-4">Page not found!</p>
        </div>
    );
};

export default NotFound;

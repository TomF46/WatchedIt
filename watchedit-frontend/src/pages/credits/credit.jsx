import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCreditById } from "../../api/creditsApi";

function Credit({userIsAuthenticated}) {
    const { id } = useParams();
    const [credit, setCredit] = useState(null);

    useEffect(() => {
        if (!credit) {
            getCredit();
        }
    }, [id, credit]);

    function getCredit() {
        getCreditById(id)
            .then((res) => {
                setCredit(res);
                console.log(res);
            })
            .catch((err) => {
                toast.error(`Error getting credit ${err.message}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="credit-page">
            {!credit ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p className="text-primary text-xl">{credit.role}</p>
                    <p>Person: {credit.person.firstName} {credit.person.lastName}</p>
                    <p>Film: {credit.film.name}</p>
                </>
            )}
        </div>
    );
}

Credit.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};

export default connect(mapStateToProps)(Credit);


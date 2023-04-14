import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ManageCreditForm from "../../../components/Credits/ManageCreditForm";
import { getCreditById, updateCredit } from "../../../api/creditsApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function EditCredit({userIsAuthenticated}) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [credit, setCredit] = useState(null);
    const [creditUpdate, setCreditUpdate] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!credit) {
            getCredit();
        }
    }, [id, credit]);

    function getCredit() {
        getCreditById(id)
            .then((res) => {
                setCredit(res);
                mapForEditing(res);
            })
            .catch((err) => {
                toast.error(`Error getting credit ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function mapForEditing(data){
        setCreditUpdate({
            role: data.role,
            type: data.type
        });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setCreditUpdate(prevCredit=> ({
            ...prevCredit,
            [name]: value
        }));
    }

    function formIsValid() {
        const { role, type } = credit;
        const errors = {};
        if (!role) errors.role = "Role is required";
        if (!type) errors.type = "Role type is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSubmit(event){
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);

        updateCredit(credit.id, creditUpdate).then(res => {
            navigate(`/credits/${credit.id}`);
        }).catch((err) => {
            toast.error(`Error getting credit ${err.data.Exception}`, {
                autoClose: false,
            });
            setSaving(false);
        });
    }

    return (
        <div className="credit-page">
            {!credit ? (
                <LoadingMessage message={"Loading credit."} />
            ) : (
                <>
                    <h1 className="text-center text-primary text-4xl my-4">Edit role {credit.role} - {credit.person.fullName} - {credit.film.name} - {credit.film.name}</h1>
                    <ManageCreditForm credit={creditUpdate} onChange={handleChange} onSubmit={handleSubmit} errors={errors} saving={saving} />
                </>
            )}
        </div>
    );
}

EditCredit.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null
    };
};

export default connect(mapStateToProps)(EditCredit);


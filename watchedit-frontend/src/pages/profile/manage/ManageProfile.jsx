import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getUserById, updateCurrentUser } from "../../../api/usersApi";
import { uploadImage } from "../../../api/imageApi";
import { useNavigate } from "react-router-dom";
import UserManageForm from "../../../components/User/Manage/UserManageForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function ManageProfile({id}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);


    useEffect(() => {
        if (!user || user.id != id) {
            getUser();
        }
    }, [id, user]);

    function getUser() {
        getUserById(id)
            .then((res) => {
                setUser(res);
                mapUpdatedUser(res);
            })
            .catch((err) => {
                toast.error(`Error getting user ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function mapUpdatedUser(data){
        setUpdatedUser({
            imageUrl: data.imageUrl,
            biography: data.biography
        })
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setUpdatedUser(prevUpdatedUser => ({
            ...prevUpdatedUser,
            [name]: value
        }));
    }

    function handleImageChange(event){
        if(event == null){
            updatedUser.imageUrl = null;
            setUpdatedUser({ ...updatedUser});
            return;
        }

        let file = event.target.files[0];
        setImageUploading(true);
        uploadImage(file, "users").then(res => {
            updatedUser.imageUrl = res.url;
            setUpdatedUser({ ...updatedUser});
            setImageUploading(false);
        }).catch(error => {
            setImageUploading(false);
            toast.error(`Error uploading image ${error.message}`, {
                autoClose: false
            }
            );
        });
    }

    function formIsValid(){
        const { biography, imageUrl } = updatedUser;
        const errors = {};
        if(biography && biography.length > 400) errors.firstName = "Biography cant be longer than 400 characters";
        if(!imageUrl) errors.imageUrl = "Image url is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        setSaving(true);
        updateCurrentUser(updatedUser).then(res => {
            toast.success("Profile saved");
            navigate(`/profile`);
        }).catch(err => {
            setSaving(false);
            toast.error(`Error saving ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="profile-manage-page">
            {!user ? (
                <LoadingMessage message={"Loading form."} />
            ) : (
                <div>
                    <h1 className="text-center text-primary text-4xl my-4">Update {user.username}</h1>
                    <UserManageForm user={updatedUser} onChange={handleChange} onImageChange={handleImageChange} onSave={handleSave} errors={errors} saving={saving} uploadingImage={imageUploading} />
                </div>
            )}
        </div>
    );
}

ManageProfile.propTypes = {
    id: PropTypes.any.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        id: state.tokens.id,
    };
};

export default connect(mapStateToProps)(ManageProfile);

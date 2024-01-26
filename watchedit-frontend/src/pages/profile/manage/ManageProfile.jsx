import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserById, updateCurrentUser } from "../../../api/usersApi";
import { uploadImage } from "../../../api/imageApi";
import { useNavigate } from "react-router-dom";
import ManageUserForm from "../../../components/User/Manage/ManageUserForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { useQuery } from "@tanstack/react-query";

function ManageProfile() {
  const id = useSelector((state) => state.tokens.id);
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ["manage-user", id],
    queryFn: () =>
      getUserById(id).then((res) => {
        mapUpdatedUser(res);
        return res;
      }),
  });

  function mapUpdatedUser(data) {
    setUpdatedUser({
      imageUrl: data.imageUrl,
      biography: data.biography,
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUpdatedUser((prevUpdatedUser) => ({
      ...prevUpdatedUser,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    if (event == null) {
      updatedUser.imageUrl = null;
      setUpdatedUser({ ...updatedUser });
      return;
    }

    let file = event.target.files[0];
    setImageUploading(true);
    uploadImage(file, "users")
      .then((res) => {
        updatedUser.imageUrl = res.url;
        setUpdatedUser({ ...updatedUser });
        setImageUploading(false);
      })
      .catch((error) => {
        setImageUploading(false);
        toast.error(`Error uploading image ${error.message}`, {
          autoClose: false,
        });
      });
  }

  function formIsValid() {
    const { biography, imageUrl } = updatedUser;
    const errors = {};
    if (biography && biography.length > 400)
      errors.firstName = "Biography cant be longer than 400 characters";
    if (!imageUrl) errors.imageUrl = "Image url is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    updateCurrentUser(updatedUser)
      .then(() => {
        toast.success("Profile saved");
        navigate(`/profile`);
      })
      .catch((err) => {
        setSaving(false);
        toast.error(`Error saving ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  if (isLoading) return <LoadingMessage message={"Loading form."} />;

  if (error) {
    toast.error(`Error getting user ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="profile-manage-page">
      <ManageUserForm
        user={updatedUser}
        onChange={handleChange}
        onImageChange={handleImageChange}
        onSave={handleSave}
        errors={errors}
        saving={saving}
        uploadingImage={imageUploading}
      />
    </div>
  );
}

export default ManageProfile;

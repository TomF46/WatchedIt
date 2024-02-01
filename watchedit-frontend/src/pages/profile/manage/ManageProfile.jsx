import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserById, updateCurrentUser } from "../../../api/usersApi";
import { uploadImage } from "../../../api/imageApi";
import { useNavigate } from "react-router-dom";
import ManageUserForm from "../../../components/User/Manage/ManageUserForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../../components/Error/ErrorMessage";

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

  const updateUser = useMutation({
    mutationFn: (updatedUser) => {
      setSaving(true);
      return updateCurrentUser(updatedUser);
    },
    onSuccess: () => {
      toast.success("Profile saved");
      navigate(`/profile`);
    },
    onError: (err) => {
      setSaving(false);
      toast.error(`Error saving ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  const uploadProfileImage = useMutation({
    mutationFn: (file) => {
      setImageUploading(true);
      return uploadImage(file, "users");
    },
    onSuccess: (res) => {
      updatedUser.imageUrl = res.url;
      setUpdatedUser({ ...updatedUser });
      setImageUploading(false);
    },
    onError: (err) => {
      setImageUploading(false);
      toast.error(`Error uploading image ${err.data.Exception}`, {
        autoClose: false,
      });
    },
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
    uploadProfileImage.mutate(file);
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
    updateUser.mutate(updatedUser);
  }

  if (isLoading) return <LoadingMessage message={"Loading form."} />;

  if (error) {
    return (
      <ErrorMessage
        message={"Error loading user profile for editing."}
        error={error}
      />
    );
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

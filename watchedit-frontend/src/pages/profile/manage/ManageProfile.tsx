import { useState } from 'react';
import { toast } from 'react-toastify';
import { getUserById, updateCurrentUser } from '../../../api/usersApi';
import { uploadImage } from '../../../api/imageApi';
import { useNavigate } from 'react-router-dom';
import ManageUserForm from '../../../components/User/Manage/ManageUserForm';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import { useMutation, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { useAppSelector } from '../../../redux/store';
import { EditableUser, UserFormErrors } from '../../../types/Auth';

function ManageProfile() {
  const id = useAppSelector((state) => state.authentication.tokens!.id);
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState<EditableUser>(
    {} as EditableUser,
  );
  const [errors, setErrors] = useState({} as UserFormErrors);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const { isLoading, error } = useQuery({
    queryKey: ['manage-user', id],
    queryFn: () =>
      getUserById(id).then((res) => {
        setUpdatedUser({
          id: res.id,
          username: res.username,
          email: res.email,
          biography: res.biography,
          imageUrl: res.imageUrl,
        });
        return res;
      }),
  });

  const updateUser = useMutation({
    mutationFn: (updatedUser: EditableUser) => {
      setSaving(true);
      return updateCurrentUser(updatedUser);
    },
    onSuccess: () => {
      toast.success('Profile saved');
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
    mutationFn: (file: File) => {
      setImageUploading(true);
      return uploadImage(file, 'users');
    },
    onSuccess: (res) => {
      updatedUser!.imageUrl = res.url;
      setUpdatedUser({ ...updatedUser! });
      setImageUploading(false);
    },
    onError: (err) => {
      setImageUploading(false);
      toast.error(`Error uploading image ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const { name, value } = event.target;
    setUpdatedUser((prevUpdatedUser) => ({
      ...prevUpdatedUser,
      [name]: value,
    }));
  }

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement> | null,
  ): void {
    if (event == null || event.target.files == null) {
      updatedUser!.imageUrl = undefined;
      setUpdatedUser({ ...updatedUser! });
      return;
    }

    const file = event.target.files[0];
    uploadProfileImage.mutate(file);
  }

  function formIsValid(): boolean {
    const { biography, imageUrl } = updatedUser;
    const errors = {} as UserFormErrors;
    if (biography && biography.length > 400)
      errors.biography = 'Biography cant be longer than 400 characters';
    if (!imageUrl) errors.imageUrl = 'Image url is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValid()) return;
    updateUser.mutate(updatedUser);
  }

  if (isLoading) return <LoadingMessage message={'Loading form.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading user profile for editing.'}
        error={error.data.Exception}
      />
    );
  }

  return (
    <div className='profile-manage-page'>
      <ManageUserForm
        user={updatedUser!}
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

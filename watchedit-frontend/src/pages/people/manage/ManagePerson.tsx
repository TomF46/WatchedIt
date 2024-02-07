import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { uploadImage } from "../../../api/imageApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import ManagePersonForm from "../../../components/People/Manage/ManagePersonForm";
import { useMutation } from "@tanstack/react-query";

function ManagePerson({ person, updatePerson, triggerSave, saving }) {
  const [errors, setErrors] = useState({});
  const [imageUploading, setImageUploading] = useState(false);
  const defaultImage =
    "https://watched-it.s3.eu-west-1.amazonaws.com/films/b625dbbe-0a08-4162-9788-cda553551ff4";

  const uploadHeadshot = useMutation({
    mutationFn: (file) => {
      setImageUploading(true);
      return uploadImage(file, "people");
    },
    onSuccess: (res) => {
      person.imageUrl = res.url;
      updatePerson({ ...person });
      setImageUploading(false);
    },
    onError: (err) => {
      setImageUploading(false);
      toast.error(`Error uploading image ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function handleChange(event) {
    const { name, value } = event.target;
    updatePerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  }

  function handleDateChange(date) {
    person.dateOfBirth = date;
    updatePerson({ ...person });
  }

  function handleImageChange(event) {
    if (event == null) {
      person.imageUrl = null;
      updatePerson({ ...person });
      return;
    }

    let file = event.target.files[0];
    uploadHeadshot.mutate(file);
  }

  function handleUseDefaultImage() {
    person.imageUrl = defaultImage;
    updatePerson({ ...person });
  }

  function formIsValid() {
    const {
      firstName,
      lastName,
      middleNames,
      stageName,
      description,
      imageUrl,
      dateOfBirth,
    } = person;
    const errors = {};
    if (!firstName) errors.firstName = "First name is required";
    if (firstName.length > 50)
      errors.firstName = "First name cant be longer than 50 characters";
    if (!lastName) errors.lastName = "Last name is required";
    if (lastName.length > 50)
      errors.lastName = "Last name cant be longer than 50 characters";
    if (middleNames && middleNames.length > 80)
      errors.middleNames = "Middle names cant be longer than 80 characters";
    if (stageName && stageName.length > 50)
      errors.stageName = "Stage name cant be longer than 50 characters";
    if (!description) errors.description = "Description is required";
    if (description.length > 800)
      errors.description = "Description cant be longer than 800 characters";
    if (!imageUrl) errors.imageUrl = "Image url is required";
    if (!dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    triggerSave();
  }

  return (
    <div className="manage-person-page">
      {person ? (
        <ManagePersonForm
          person={person}
          onChange={handleChange}
          onDateChange={handleDateChange}
          onImageChange={handleImageChange}
          onUseDefaultImage={handleUseDefaultImage}
          onSave={handleSave}
          errors={errors}
          saving={saving}
          uploadingImage={imageUploading}
        />
      ) : (
        <LoadingMessage message={"Loading form."} />
      )}
    </div>
  );
}

ManagePerson.propTypes = {
  person: PropTypes.object.isRequired,
  updatePerson: PropTypes.func.isRequired,
  triggerSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ManagePerson;

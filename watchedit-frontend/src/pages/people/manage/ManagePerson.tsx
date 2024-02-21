import { useState } from "react";
import { toast } from "react-toastify";
import { uploadImage } from "../../../api/imageApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import ManagePersonForm from "../../../components/People/Manage/ManagePersonForm";
import { useMutation } from "@tanstack/react-query";
import { EditablePerson, PersonFormErrors } from "../../../types/People";

type Props = {
  person: EditablePerson;
  updatePerson: (person: EditablePerson) => void;
  triggerSave: () => void;
  saving: boolean;
};

function ManagePerson({ person, updatePerson, triggerSave, saving }: Props) {
  const [errors, setErrors] = useState({} as PersonFormErrors);
  const [imageUploading, setImageUploading] = useState(false);
  const defaultImage =
    "https://watched-it.s3.eu-west-1.amazonaws.com/films/b625dbbe-0a08-4162-9788-cda553551ff4";

  const uploadHeadshot = useMutation({
    mutationFn: (file: File) => {
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

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ): void {
    const { name, value } = event.target;
    updatePerson({
      ...person,
      [name]: value,
    });
  }

  function handleDateChange(date: Date | null): void {
    if (!date) return;
    person.dateOfBirth = date;
    updatePerson({ ...person });
  }

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement> | null,
  ): void {
    if (event == null || !event.target.files) {
      person.imageUrl = undefined;
      updatePerson({ ...person });
      return;
    }

    const file = event.target.files[0];
    uploadHeadshot.mutate(file);
  }

  function handleUseDefaultImage(): void {
    person.imageUrl = defaultImage;
    updatePerson({ ...person });
  }

  function formIsValid(): boolean {
    const {
      firstName,
      lastName,
      middleNames,
      stageName,
      description,
      imageUrl,
      dateOfBirth,
    } = person;
    const errors = {} as PersonFormErrors;
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

  function handleSave(event: React.SyntheticEvent): void {
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

export default ManagePerson;

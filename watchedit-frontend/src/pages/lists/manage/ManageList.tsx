import { useState } from "react";
import ManageListForm from "../../../components/Lists/Manage/ManageListForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import { EditableList, ListFormErrors } from "../../../types/Lists";

type Props = {
  list: EditableList;
  updateList: (list: EditableList) => void;
  triggerSave: () => void;
  saving: boolean;
};

function ManageList({ list, updateList, triggerSave, saving }: Props) {
  const [errors, setErrors] = useState({} as ListFormErrors);

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ): void {
    const { name, value } = event.target;
    updateList({
      ...list,
      [name]: value,
    });
  }

  function formIsValid(): boolean {
    const { name, description } = list;
    const errors = {} as ListFormErrors;
    if (!name) errors.name = "Name is required";
    if (name.length > 60)
      errors.name = "Name can't be longer than 60 characters.";
    if (!description) errors.description = "Description is required";
    if (description.length > 400)
      errors.description = "Description can't be longer than 400 characters.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event: React.SyntheticEvent): void {
    event.preventDefault();
    if (!formIsValid()) return;
    triggerSave();
  }

  return (
    <div className="manage-list-page">
      {list ? (
        <ManageListForm
          list={list}
          onChange={handleChange}
          onSave={handleSave}
          errors={errors}
          saving={saving}
        />
      ) : (
        <LoadingMessage message={"Loading form."} />
      )}
    </div>
  );
}

export default ManageList;

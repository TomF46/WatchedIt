import PropTypes from "prop-types";
import { useState } from "react";
import ManageListForm from "../../../components/Lists/Manage/ManageListForm";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function ManageList({ list, updateList, triggerSave, saving }) {
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    updateList((prevList) => ({
      ...prevList,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name, description } = list;
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (name.length > 60)
      errors.name = "Name can't be longer than 60 characters.";
    if (!description) errors.description = "Description is required";
    if (description.length > 400)
      errors.description = "Description can't be longer than 400 characters.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
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

ManageList.propTypes = {
  list: PropTypes.object.isRequired,
  updateList: PropTypes.func.isRequired,
  triggerSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ManageList;

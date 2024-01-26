import PropTypes from "prop-types";
import { useState } from "react";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import ManageTriviaForm from "../../../components/Films/Trivia/ManageTriviaForm";

function ManageTrivia({ film, trivia, updateTrivia, triggerSave, saving }) {
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    updateTrivia((prevFilmTrivia) => ({
      ...prevFilmTrivia,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { text } = trivia;
    const errors = {};
    if (!text) errors.text = "Trivia text is required";
    if (text.length > 1000)
      errors.text = "Trivia text cant be longer than 1000 characters";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    triggerSave();
  }

  return (
    <div className="manage-film-trivia-page">
      {film && trivia ? (
        <>
          <ManageTriviaForm
            trivia={trivia}
            film={film}
            onChange={handleChange}
            onSave={handleSave}
            errors={errors}
            saving={saving}
          />
        </>
      ) : (
        <LoadingMessage message={"Loading form."} />
      )}
    </div>
  );
}

ManageTrivia.propTypes = {
  film: PropTypes.object.isRequired,
  trivia: PropTypes.object.isRequired,
  updateTrivia: PropTypes.func.isRequired,
  triggerSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default ManageTrivia;

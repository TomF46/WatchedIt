import { useState } from "react";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import ManageTriviaForm from "../../../components/Films/Trivia/ManageTriviaForm";
import { Film } from "../../../types/Films";
import { EditableTrivia, TriviaFormErrors } from "../../../types/Trivia";

type Props = {
  film: Film;
  trivia: EditableTrivia;
  updateTrivia: (trivia: EditableTrivia) => void;
  triggerSave: () => void;
  saving: boolean;
};

function ManageTrivia({
  film,
  trivia,
  updateTrivia,
  triggerSave,
  saving,
}: Props) {
  const [errors, setErrors] = useState({});

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    const { name, value } = event.target;
    updateTrivia({
      ...trivia,
      [name]: value,
    });
  }

  function formIsValid(): boolean {
    const { text } = trivia;
    const errors = {} as TriviaFormErrors;
    if (!text) errors.text = "Trivia text is required";
    if (text.length > 1000)
      errors.text = "Trivia text cant be longer than 1000 characters";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event: React.SyntheticEvent): void {
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
export default ManageTrivia;

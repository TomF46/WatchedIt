import { Film } from "../../../types/Films";
import { EditableTrivia, TriviaFormErrors } from "../../../types/Trivia";
import TextAreaInput from "../../Inputs/TextAreaInput";

type Props = {
  trivia: EditableTrivia;
  film: Film;
  errors: TriviaFormErrors;
  onSave: (event: React.SyntheticEvent) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  saving: boolean;
};

const ManageTriviaForm = ({
  trivia,
  film,
  onSave,
  onChange,
  saving = false,
  errors,
}: Props) => {
  return (
    <form className="mt-4" onSubmit={onSave}>
      {errors.onSave && (
        <div className="text-red-500 text-xs p-1" role="alert">
          {errors.onSave}
        </div>
      )}

      <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4">
        <div className="bg-backgroundOffset2 rounded-t-md">
          <p className="text-primary font-semibold text-center text-2xl px-2 py-1">
            {trivia.id ? `Editing` : "Adding"} trivia for {film.name}
          </p>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <TextAreaInput
              name="text"
              label="Trivia text"
              value={trivia.text}
              onChange={onChange}
              error={errors.text}
              required={true}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-backgroundOffset p-4 my-4 shadow rounded">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
        >
          <svg
            className="text-white h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={2}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
            />
          </svg>
          <span className="ml-1">{saving ? "Saving..." : "Save"}</span>
        </button>
      </div>
    </form>
  );
};

export default ManageTriviaForm;

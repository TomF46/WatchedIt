import { Film } from "../../../types/Films";
import { EditableTrivia, TriviaFormErrors } from "../../../types/Trivia";
import SubmitButtonWIcon from "../../Buttons/SubmitButtonWIcon";
import TriviaIcon from "../../Icons/TriviaIcon";
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
        <SubmitButtonWIcon
          text={saving ? "Saving..." : "Save"}
          disabled={saving}
          icon={<TriviaIcon />}
          bgColor="bg-primary"
        />
      </div>
    </form>
  );
};

export default ManageTriviaForm;

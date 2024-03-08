import { CommentFormErrors, EditableComment } from "../../types/Reviews";
import SubmitButtonWIcon from "../Buttons/SubmitButtonWIcon";
import CommentIcon from "../Icons/CommentIcon";
import TextAreaInput from "../Inputs/TextAreaInput";

type Props = {
  comment: EditableComment;
  errors: CommentFormErrors;
  onSubmit: (event: React.SyntheticEvent) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  saving: boolean;
  editing: boolean;
};

const CommentForm = ({
  comment,
  onChange,
  onSubmit,
  errors,
  saving = false,
  editing = false,
}: Props) => {
  return (
    <form className="" onSubmit={onSubmit}>
      {errors.onSubmit && (
        <div className="text-red-500 text-xs p-1" role="alert">
          {errors.onSubmit}
        </div>
      )}
      <div
        className={`controls bg-backgroundOffset mt-4 mb-4 p-4 ${
          !editing && "shadow rounded"
        }`}
      >
        <div>
          <TextAreaInput
            name="text"
            label="Text"
            value={comment.text}
            required={true}
            onChange={onChange}
            error={errors.text}
          />
        </div>
      </div>
      <div
        className={`flex justify-center bg-backgroundOffset p-4 my-4 ${
          !editing && "shadow rounded"
        }`}
      >
        <SubmitButtonWIcon
          text={saving ? "Submitting..." : "Submit"}
          disabled={saving}
          icon={<CommentIcon color="white" height={5} width={10} />}
          bgColor="bg-primary"
        />
      </div>
    </form>
  );
};

export default CommentForm;

import ErrorIcon from "../../assets/ErrorIcon.svg";
import ButtonWIcon from "../Buttons/ButtonWIcon";
import RetryIcon from "../Icons/RetryIcon";

type Props = {
  message: string;
  error: string;
};

const ErrorMessage = ({ message, error }: Props) => {
  return (
    <div className="error-message text-center mt-4">
      <div className="text-center grid grid-cols-12">
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          <img
            src={ErrorIcon}
            className="error-icon mx-auto"
            alt="Error graphic"
          />
        </div>
      </div>
      <h2 className="text-primary text-2xl">{message}</h2>
      <p>{error}</p>
      <div className="flex justify-center my-4">
        <ButtonWIcon
          text="Retry"
          onClick={() => location.reload()}
          icon={<RetryIcon color="white" height={5} width={5} />}
          bgColor="bg-primary"
        />
      </div>
    </div>
  );
};

export default ErrorMessage;

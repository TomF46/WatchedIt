import PropTypes from "prop-types";
import ErrorIcon from "../../assets/ErrorIcon.svg";

const ErrorMessage = ({ message, error }) => {
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
      <p>{error.data.Exception}</p>
      <div className="flex justify-center my-4">
        <button
          onClick={() => location.reload()}
          className="bg-primary  text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center"
        >
          <svg
            className="text-white h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span className="ml-1">Retry</span>
        </button>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  error: PropTypes.object.isRequired,
};

export default ErrorMessage;
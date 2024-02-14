import LoadingSpinner from "./LoadingSpinner";

const LoadingMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-center mt-4 pt-4">
      <div>
        <LoadingSpinner />
        {message != null && <p className="text-center my-4">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingMessage;

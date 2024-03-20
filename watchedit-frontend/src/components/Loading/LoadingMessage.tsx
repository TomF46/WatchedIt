import LoadingSpinner from './LoadingSpinner';

const LoadingMessage = ({ message }: { message: string }) => {
  return (
    <div className='mt-4 flex justify-center pt-4'>
      <div>
        <LoadingSpinner />
        {message != null && <p className='my-4 text-center'>{message}</p>}
      </div>
    </div>
  );
};

export default LoadingMessage;

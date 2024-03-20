import ErrorIcon from '../../assets/ErrorIcon.svg';
import ButtonWIcon from '../Buttons/ButtonWIcon';
import RetryIcon from '../Icons/RetryIcon';

type Props = {
  message: string;
  error: string;
};

const ErrorMessage = ({ message, error }: Props) => {
  return (
    <div className='error-message mt-4 text-center'>
      <div className='grid grid-cols-12 text-center'>
        <div className='col-span-12 md:col-span-6 md:col-start-4'>
          <img
            src={ErrorIcon}
            className='error-icon mx-auto'
            alt='Error graphic'
          />
        </div>
      </div>
      <h2 className='text-2xl text-primary'>{message}</h2>
      <p>{error}</p>
      <div className='my-4 flex justify-center'>
        <ButtonWIcon
          text='Retry'
          onClick={() => location.reload()}
          icon={<RetryIcon color='white' height={5} width={5} />}
          bgColor='bg-primary'
        />
      </div>
    </div>
  );
};

export default ErrorMessage;

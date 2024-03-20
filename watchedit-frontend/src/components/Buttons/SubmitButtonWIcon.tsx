import { ReactNode } from 'react';

type Props = {
  text: string;
  icon: ReactNode;
  bgColor: string;
  additionalClasses?: string;
  disabled?: boolean;
};

const SubmitButtonWIcon = ({
  text,
  icon,
  bgColor,
  additionalClasses,
  disabled,
}: Props) => {
  return (
    <button
      type='submit'
      disabled={disabled}
      className={`${bgColor} inline-flex items-center rounded px-4 py-2 text-white hover:opacity-75 ${
        additionalClasses ? additionalClasses : ''
      }`}
    >
      {icon}
      <span className='ml-1'>{text}</span>
    </button>
  );
};

export default SubmitButtonWIcon;

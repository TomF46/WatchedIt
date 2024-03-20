import { ReactNode } from 'react';

type Props = {
  text: string;
  icon: ReactNode;
  bgColor: string;
  onClick: () => void;
  additionalClasses?: string;
  disabled?: boolean;
};

const ButtonWIcon = ({
  text,
  icon,
  bgColor,
  onClick,
  additionalClasses,
  disabled,
}: Props) => {
  return (
    <button
      onClick={onClick}
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

export default ButtonWIcon;

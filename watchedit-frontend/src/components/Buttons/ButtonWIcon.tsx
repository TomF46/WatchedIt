import { ReactNode } from "react";

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
      className={`${bgColor} text-white rounded py-2 px-4 hover:opacity-75 inline-flex items-center ${
        additionalClasses ? additionalClasses : ""
      }`}
    >
      {icon}
      <span className="ml-1">{text}</span>
    </button>
  );
};

export default ButtonWIcon;

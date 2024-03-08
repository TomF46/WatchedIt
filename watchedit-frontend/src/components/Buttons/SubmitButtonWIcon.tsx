import { ReactNode } from "react";

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
      type="submit"
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

export default SubmitButtonWIcon;

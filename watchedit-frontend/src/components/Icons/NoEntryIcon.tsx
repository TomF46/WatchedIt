import IconProps from "./IconProps";

const NoEntryIcon = ({ color, height, width, strokeWidth }: IconProps) => {
  return (
    <svg
      className={`text-${color} h-${height} w-${width}`}
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokeWidth ? strokeWidth : 1.5}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
      />
    </svg>
  );
};

export default NoEntryIcon;

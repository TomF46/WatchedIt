import IconProps from "./IconProps";

const ArrowRightIcon = ({ color, height, width, strokeWidth }: IconProps) => {
  return (
    <svg
      className={`text-${color} h-${height} w-${width}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth ? strokeWidth : 2}
        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default ArrowRightIcon;

import IconProps from './IconProps';

const TickIcon = ({ color, height, width, strokeWidth }: IconProps) => {
  return (
    <svg
      className={`text-${color} h-${height} w-${width}`}
      xmlns='http://www.w3.org/2000/svg'
      strokeWidth={strokeWidth ? strokeWidth : 2}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.5 12.75l6 6 9-13.5'
      />
    </svg>
  );
};

export default TickIcon;

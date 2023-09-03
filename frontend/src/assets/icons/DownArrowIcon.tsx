type Props = {
  color: string;
};

const DownArrowIcon = ({ color }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <g clipPath="url(#clip0_2043_28)">
        <path
          d="M16.292 6.0559L9.00033 12.2998L1.70866 6.0559"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2043_28">
          <rect width="16.6667" height="16.6504" fill="white" transform="translate(0.666992 0.852539)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DownArrowIcon;

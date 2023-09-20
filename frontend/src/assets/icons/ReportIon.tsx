type Props = {
  color?: string;
};

const ReportIcon = ({ color = '#000000' }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <mask id="mask0_2576_85" maskUnits="userSpaceOnUse" x="1" y="1" width="34" height="36">
        <path
          d="M30 29.1667H10V17.5C10 11.9775 14.4775 7.5 20 7.5C25.5225 7.5 30 11.9775 30 17.5V29.1667Z"
          fill="white"
          stroke="white"
          strokeWidth="3.33333"
          strokeLinejoin="round"
        />
        <path
          d="M6.66683 35.0002H33.3335M3.3335 10.8335L5.8335 11.6668M10.8335 3.3335L11.6668 5.8335M8.3335 8.3335L5.8335 5.8335"
          stroke="white"
          strokeWidth="3.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_2576_85)">
        <path d="M0 0H40V40H0V0Z" fill={color} />
      </g>
    </svg>
  );
};

export default ReportIcon;

import color from '@Styles/color';

type Props = {
  circleColor?: string;
};

const CircleCheckIcon = ({ circleColor = color.blue[500] }: Props) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="10" fill={circleColor} />
      <path
        d="M8.36665 14L4.56665 10.2L5.51665 9.25L8.36665 12.1L14.4833 5.98334L15.4333 6.93334L8.36665 14Z"
        fill="white"
      />
    </svg>
  );
};

export default CircleCheckIcon;

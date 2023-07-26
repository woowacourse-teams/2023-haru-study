type Props = {
  color: string;
};

const CheckRound = ({ color }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M6.36665 12.0001L2.56665 8.20007L3.51665 7.25007L6.36665 10.1001L12.4833 3.9834L13.4333 4.9334L6.36665 12.0001Z"
        fill={color}
      />
    </svg>
  );
};

export default CheckRound;

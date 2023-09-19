type Props = {
  color: string;
};

const ChatIcon = ({ color }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path
        d="M20.0002 5C29.1668 5 36.6668 10.9667 36.6668 18.3333C36.6668 25.7 29.1668 31.6667 20.0002 31.6667C17.9335 31.6667 15.9502 31.3667 14.1168 30.8333C9.25016 35 3.3335 35 3.3335 35C7.21683 31.1167 7.8335 28.5 7.91683 27.5C5.0835 25.1167 3.3335 21.8833 3.3335 18.3333C3.3335 10.9667 10.8335 5 20.0002 5Z"
        fill={color}
      />
    </svg>
  );
};

export default ChatIcon;

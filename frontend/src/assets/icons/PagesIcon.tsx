type Props = {
  color: string;
};

const PagesIcon = ({ color }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 18H14M7 14H8M7 10H10M7 2H16.5L21 6.5V19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 20.5V6.5C3 6.10218 3.15804 5.72064 3.43934 5.43934C3.72064 5.15804 4.10218 5 4.5 5H14.252C14.4111 5.00014 14.5636 5.06345 14.676 5.176L17.824 8.324C17.88 8.3799 17.9243 8.44632 17.9545 8.51943C17.9847 8.59254 18.0002 8.6709 18 8.75V20.5C18 20.8978 17.842 21.2794 17.5607 21.5607C17.2794 21.842 16.8978 22 16.5 22H4.5C4.10218 22 3.72064 21.842 3.43934 21.5607C3.15804 21.2794 3 20.8978 3 20.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 5V8.4C14 8.55913 14.0632 8.71174 14.1757 8.82426C14.2883 8.93679 14.4409 9 14.6 9H18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PagesIcon;

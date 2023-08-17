type Props = {
  direction?: 'up' | 'down';
};

const ArrowIcon = ({ direction = 'down' }: Props) => {
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1371_134)">
        <path
          d={
            direction === 'up'
              ? 'M17.7085 28.125L25.0002 21.875L32.2918 28.125'
              : 'M32.2915 21.875L24.9998 28.125L17.7082 21.875'
          }
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1371_134">
          <rect width="16.6667" height="16.6667" fill="white" transform="translate(16.6665 16.6667)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowIcon;

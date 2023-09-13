type Props = {
  color?: string;
};

const ResetIcon = ({ color = '#000000' }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path
        d="M3.578 6.48683C4.55072 4.80805 6.1004 3.53997 7.93848 2.91873C9.77657 2.29749 11.7778 2.36542 13.5695 3.10987C15.3613 3.85432 16.8214 5.22455 17.678 6.96543C18.5347 8.70631 18.7294 10.6992 18.2261 12.573C17.7227 14.4468 16.5556 16.0738 14.9419 17.1511C13.3282 18.2284 11.378 18.6825 9.45441 18.4289C7.53082 18.1753 5.76494 17.2313 4.48557 15.7727C3.20621 14.314 2.50055 12.4401 2.5 10.4998"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.5 6.5H3.5V2.5" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default ResetIcon;

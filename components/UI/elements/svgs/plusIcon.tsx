interface Props {
  fill?: string;
  size?: number | string;
}

export const PlusIcon = ({ fill = '--col-black', size = 14 }: Props): JSX.Element => {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.1999 6.48454V6.28454H14.9999H9.74427V1V0.8H9.54427H6.45561H6.25561V1V6.28454H0.999939H0.799939V6.48454V9.5732V9.7732H0.999939H6.25561V15V15.2H6.45561H9.54427H9.74427V15V9.7732H14.9999H15.1999V9.5732V6.48454Z"
        fill={fill}
        stroke={fill}
        strokeWidth="0.4"
      />
    </svg>
  );
};

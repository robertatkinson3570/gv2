interface Props {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  size?: number;
  active?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
}

export const ToggleAccordionIcon = ({
  fill = 'var(--col-white)',
  stroke = 'val(--col-black)',
  size = 2,
  strokeWidth = 3,
  direction = 'down',
  active = false,
}: Props): JSX.Element => {
  const getDeg = () => {
    switch (direction) {
      case 'left':
        return 90;
      case 'right':
        return -90;
      case 'up':
        return 180;
      case 'down':
        return 0;
      default:
        break;
    }
  };

  return (
    <svg
      width={`${size}rem`}
      height={`${size}rem`}
      viewBox={active ? '0 0 50 34' : '0 0 50 52'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${getDeg()}deg)` }}
    >
      {active
        ? (
        <>
          <g fill="#fff">
            <path d="m47 3v9h-9v-9z" />
            <path d="m29 30v-9h-8v9z" />
            <path d="m38 12v9h-9v-9z" />
            <path d="m21 21v-9h-9v9z" />
            <path d="m12 12v-9h-9v9z" />
            <path d="m29 22v9h-8v-9z" />
          </g>
          <path
            d="m48.5 3v-1.5h-1.5-9-1.5v1.5 7.5h-7.5-1.5v1.5 7.5h-5v-7.5-1.5h-1.5-7.5v-7.5-1.5h-1.5-9-1.5v1.5 9 1.5h1.5 7.5v7.5 1.5h1.5 7.5v7.5 1 .5 1h1.5 8 1.5v-1-.5-1-7.5h7.5 1.5v-1.5-7.5h7.5 1.5v-1.5z"
            stroke="#000"
            strokeWidth="3"
          />
        </>
          )
        : (
        <g fill={fill}>
          <path d="m47 3v9h-9v-9z" />
          <path d="m29 30v-9h-8v9z" />
          <path d="m38 12v9h-9v-9z" />
          <path d="m21 21v-9h-9v9z" />
          <path d="m12 12v-9h-9v9z" />
          <path d="m47 49v-9h-9v9z" />
          <path d="m29 22v9h-8v-9z" />
          <path d="m38 40v-9h-9v9z" />
          <path d="m21 31v9h-9v-9z" />
          <path d="m12 40v9h-9v-9z" />
          <path
            d="m48.5 3v-1.5h-1.5-9-1.5v1.5 7.5h-7.5-1.5v1.5 7.5h-5v-7.5-1.5h-1.5-7.5v-7.5-1.5h-1.5-9-1.5v1.5 9 1.5h1.5 7.5v7.5 1.5h1.5 7.5v7h-7.5-1.5v1.5 7.5h-7.5-1.5v1.5 9 1.5h1.5 9 1.5v-1.5-7.5h7.5 1.5v-1.5-7.5h5v7.5 1.5h1.5 7.5v7.5 1.5h1.5 9 1.5v-1.5-9-1.5h-1.5-7.5v-7.5-1.5h-1.5-7.5v-7h7.5 1.5v-1.5-7.5h7.5 1.5v-1.5z"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </g>
          )}
    </svg>
  );
};

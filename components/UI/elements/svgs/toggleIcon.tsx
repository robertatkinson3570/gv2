interface Props {
  fill?: string;
  size?: number;
  direction: 'left' | 'right' | 'up' | 'down';
}

export const ToggleIcon = ({ fill = 'var(--col-yellow-100)', direction, size = 2 }: Props): JSX.Element => {
  const getDeg = () => {
    switch (direction) {
      case 'left':
        return -90;
      case 'right':
        return 90;
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
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${getDeg()}deg)` }}
    >
      <g>
        <path d="M1.9502 4.84892L2.73709 4.84892L7.9194 8.11388L6.76213 8.83936L1.9502 5.75152L1.9502 4.84892Z" fill={fill} />
        <path d="M11.9502 5.5744V4.84892H10.7929L5.61062 8.11388L6.76789 8.83936L11.9502 5.5744Z" fill={fill} />
        <path d="M1.9502 1.65658H2.73709L7.9194 4.92154L6.76213 5.64701L1.9502 2.55917L1.9502 1.65658Z" fill={fill} />
        <path d="M11.9502 2.38205V1.65658H10.7929L5.61062 4.92154L6.76789 5.64701L11.9502 2.38205Z" fill={fill} />
      </g>
    </svg>
  );
};

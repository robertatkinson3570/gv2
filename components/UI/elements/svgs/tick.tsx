interface Props {
  fill?: string;
  size?: number;
}
export const TickIconSVG = ({ fill = 'var(--col-info-200)', size = 18 }: Props): JSX.Element => {
  return (
    <svg width={size} height={size} viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.9"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1236 0L4.62592 7.50523L2.00024 5L0.123539 6.90017L3.68756 10.3555C3.93643 10.6074 4.27396 10.749 4.62592 10.749C4.97787 10.749 5.3154 10.6074 5.56427 10.3555L14.0003 1.90016L12.1236 0Z"
        fill={fill}
      />
    </svg>
  );
};

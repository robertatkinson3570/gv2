interface Props {
  fill?: string;
  size?: number;
}

export const SendIcon = ({ fill = 'var(--col-purple-400)', size = 20 }: Props): JSX.Element => {
  return (
    <svg width={size} height={size} viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0146 3.99996L12.0146 19.9999L6.01951 19.9999L6.01951 3.99996L12.0146 3.99996Z" fill={fill} />
      <path d="M6.01955 -0.000244141L6.01955 23.9997L0.0244143 23.9997L0.0244141 -0.000244069L6.01955 -0.000244141Z" fill={fill} />
      <path d="M18.0097 9.33366L18.0097 15.3336L12.0146 15.3336L12.0146 9.33366L18.0097 9.33366Z" fill={fill} />
    </svg>
  );
};

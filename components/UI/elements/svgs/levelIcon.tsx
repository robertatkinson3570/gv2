interface Props {
  fill?: string;
  size?: number | string;
}

export const LevelIcon = ({ fill = 'var(--col-purple-300)', size = 20 }: Props): JSX.Element => {
  return (
    <svg width={size} height={size} viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.1291 3.27084H11.8203V11.019H6.1291V3.27084Z" fill={fill} />
      <path d="M6.12913 12.6793H11.8203V16H6.12913V12.6793Z" fill={fill} />
      <path d="M9 0L18 7.00169H0L9 0Z" fill={fill} />
    </svg>
  );
};

interface Props {
  fill?: string;
  width?: number | string;
  height?: number | string;
  dir: 'left' | 'right';
}

export const ArrowIcon = ({ fill = 'var(--col-purple-300)', width = 25, height = 40, dir }: Props): JSX.Element => {
  return dir === 'right'
    ? (
    <svg width={width} height={height} viewBox="0 0 25 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.613281 0L8.61328 0L8.61328 8L0.613281 8L0.613281 0Z" fill={fill} />
      <path d="M24.6133 16L16.6133 16V24H24.6133V16Z" fill={fill} />
      <path d="M8.61328 8H16.6133L16.6133 16H8.61328V8Z" fill={fill} />
      <path d="M16.6133 24L8.61328 24L8.61328 32L16.6133 32V24Z" fill={fill} />
      <path d="M8.61328 32H0.613281L0.613281 40H8.61328L8.61328 32Z" fill={fill} />
    </svg>
      )
    : (
    <svg width={width} height={height} viewBox="0 0 25 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.8652 0L16.8652 0V8L24.8652 8V0Z" fill={fill} />
      <path d="M0.865234 16L8.86523 16V24H0.865234V16Z" fill={fill} />
      <path d="M16.8652 8H8.86523L8.86523 16H16.8652V8Z" fill={fill} />
      <path d="M8.86523 24L16.8652 24L16.8652 32L8.86523 32V24Z" fill={fill} />
      <path d="M16.8652 32H24.8652L24.8652 40H16.8652V32Z" fill={fill} />
    </svg>
      );
};

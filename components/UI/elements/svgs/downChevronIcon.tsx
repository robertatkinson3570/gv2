interface Props {
  fill: string;
  size?: string;
}

export const DownChevronIcon = ({ fill = 'var(--col-pink-400)', size = '20px' }: Props): JSX.Element => {
  return <svg width={size} height={size} viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7.53857" y="4.52332" width="6.03109" height="2.26166" transform="rotate(-180 7.53857 4.52332)" fill={fill} />
    <rect x="9.04663" y="2.26166" width="9.04663" height="2.26166" transform="rotate(-180 9.04663 2.26166)" fill={fill} />
    <rect width="2.01038" height="2.01038" transform="matrix(1 3.17865e-08 3.17865e-08 -1 1.50757 4.27209)" fill={fill} />
    <rect x="5.5282" y="6.28229" width="2.01038" height="2.01038" transform="rotate(-180 5.5282 6.28229)" fill={fill} />
  </svg>;
};

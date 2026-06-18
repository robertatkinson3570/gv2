interface Props {
  fill?: string;
  size?: number;
}

export const XIcon = ({ fill = 'var(--col-pink-300)', size = 20 }: Props): JSX.Element => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="8.00007" height="7.99992" fill={fill}/>
      <rect width="8.00007" height="7.99992" transform="matrix(-1 0 0 1 40 0.00012207)" fill={fill}/>
      <rect y="32" width="8.00007" height="7.99992" fill={fill}/>
      <rect width="8.00007" height="7.99992" transform="matrix(-1 0 0 1 40 32.0001)" fill={fill}/>
      <rect x="8" y="7.99966" width="8.00007" height="7.99992" fill={fill}/>
      <rect width="8.00007" height="7.99992" transform="matrix(-1 0 0 1 32 7.99966)" fill={fill}/>
      <rect x="8" y="23.9996" width="8.00007" height="7.99992" fill={fill}/>
      <rect width="8.00007" height="7.99992" transform="matrix(-1 0 0 1 32 23.9996)" fill={fill}/>
      <rect x="16" y="15.9998" width="8.00007" height="7.99992" fill={fill}/>
    </svg>
  );
};

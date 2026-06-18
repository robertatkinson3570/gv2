interface Props {
  fill?: string;
  size?: number | string;
  big?: boolean;
  opacity?: number;
}

export const CloseIcon = ({ fill = 'var(--col-purple-300)', size = 12, big = false, opacity = 1.0 }: Props): JSX.Element => {
  return big
    ? (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <rect width="8.00007" height="7.99992" fill={fill} />
      <rect width="8.00007" height="7.99992" transform="matrix(-1 0 0 1 40 0.00012207)" fill={fill} />
      <rect y="32" width="8.00007" height="7.99992" fill={fill} />
      <rect width="8.00007" height="7.99992" transform="matrix(-1 0 0 1 40 32.0001)" fill={fill} />
      <rect x="8" y="7.99966" width="8.00007" height="7.99992" fill={fill} />
      <rect width="8.00007" height="7.99992" transform="matrix(-1 0 0 1 32 7.99966)" fill={fill} />
      <rect x="8" y="23.9996" width="8.00007" height="7.99992" fill={fill} />
      <rect width="8.00007" height="7.99992" transform="matrix(-1 0 0 1 32 23.9996)" fill={fill} />
      <rect x="16" y="15.9998" width="8.00007" height="7.99992" fill={fill} />
      <rect x="0" y="0" width="100%" height="100%" fill="none" />
    </svg>
      )
    : (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <path d="M0 0L4.00003 0L4.00003 4.00002L0 4.00002L0 0Z" fill={fill} />
      <path d="M12 6.69003e-05L7.99997 6.69003e-05L7.99997 4.00009L12 4.00009L12 6.69003e-05Z" fill={fill} />
      <path d="M0 7.99997L4.00003 7.99997L4.00003 12L0 12L0 7.99997Z" fill={fill} />
      <path d="M12 7.99997L7.99997 7.99997L7.99997 12L12 12L12 7.99997Z" fill={fill} />
      <path d="M4.00003 4.00002L7.99997 4.00009L7.99997 7.99997L4.00003 7.99997L4.00003 4.00002Z" fill={fill} />
      <rect x="0" y="0" width="100%" height="100%" fill="none" />
    </svg>
      );
};

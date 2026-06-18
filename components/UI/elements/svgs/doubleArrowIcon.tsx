interface Props {
  fill?: string;
  width?: number | string;
  height?: number | string;
  dir: 'left' | 'right';
}

export const DoubleArrowIcon = ({ fill = 'var(--col-info-800)', width = 25, height = 40, dir }: Props): JSX.Element => {
  return dir === 'right'
    ? (
    <svg width={width} height={height} viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M10.2227 21.4053L10.2227 19.8472L18.4046 9.58625L20.2227 11.8776L12.4846 21.4053L10.2227 21.4053Z" fill={fill} />
        <path d="M12.0407 1.60528L10.2227 1.60528L10.2227 3.89666L18.4046 14.1576L20.2227 11.8662L12.0407 1.60528Z" fill={fill} />
        <path d="M2.22266 21.4053L2.22266 19.8472L10.4046 9.58625L12.2227 11.8776L4.48456 21.4053L2.22266 21.4053Z" fill={fill} />
        <path d="M4.04069 1.60528L2.22266 1.60528L2.22266 3.89666L10.4046 14.1576L12.2227 11.8662L4.04069 1.60528Z" fill={fill} />
      </g>
    </svg>
      )
    : (
    <svg width={width} height={height} viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M12 21.4053L12 19.8472L3.81803 9.58625L2 11.8776L9.73809 21.4053L12 21.4053Z" fill={fill} />
        <path d="M10.182 1.60528L12 1.60528L12 3.89666L3.81803 14.1576L2 11.8662L10.182 1.60528Z" fill={fill} />
        <path d="M20 21.4053L20 19.8472L11.818 9.58625L10 11.8776L17.7381 21.4053L20 21.4053Z" fill={fill} />
        <path d="M18.182 1.60528L20 1.60528L20 3.89666L11.818 14.1576L10 11.8662L18.182 1.60528Z" fill={fill} />
      </g>
    </svg>
      );
};

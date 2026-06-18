interface Props {
  fill?: string;
  width?: number;
  height?: number;
  wide?: boolean;
}
export const UpArrowIcon = ({ fill = 'var(--col-blue-border)', width = 21, height = 27, wide = false }: Props): JSX.Element => {
  return wide
    ? (
    <svg width={width} height={height} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.85331 5.31511L17.0739 5.31511L17.0739 18.8345L8.85331 18.8345L8.85331 5.31511Z" fill={fill} />
      <path d="M8.85331 21.5325L17.0739 21.5325L17.0739 26L8.85331 26L8.85331 21.5325Z" fill={fill} />
      <path d="M13 3.50789e-10L26 11.3777L3.07701e-10 11.3777L13 3.50789e-10Z" fill={fill} />
    </svg>
      )
    : (
    <svg width={width} height={height} viewBox="0 0 21 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.15075 5.51954H13.7905V19.5589H7.15075V5.51954Z" fill={fill} />
      <path d="M7.15075 22.3607H13.7905V27H7.15075V22.3607Z" fill={fill} />
      <path d="M10.5 0L21 11.8153H0L10.5 0Z" fill={fill} />
    </svg>
      );
};

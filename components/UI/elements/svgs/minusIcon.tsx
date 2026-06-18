interface Props {
  fill?: string;
}

export const MinusIcon = ({ fill = '--col-black' }: Props): JSX.Element => {
  return (
    <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-6.10271e-05 3.99963L-6.10352e-05 -0.000366211L11.9999 -0.0003662V3.99963H-6.10271e-05Z" fill={fill} />
    </svg>
  );
};

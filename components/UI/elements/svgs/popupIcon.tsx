interface Props {
  fill?: string;
  size?: number;
}

export const PopupIcon = ({ fill = 'var(--col-warning-400)', size = 20 }: Props): JSX.Element => {
  return (
    <svg width={size} height={size} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.26638 0.670054H5.73405V3.82378H3.09386V16.1784H15.5656V13.6478H18.6585V19.3337H0.000976562V0.670054H1.26638ZM18.6676 0.666992H8.09776L11.7041 4.2157L6.61361 9.34432L9.83713 12.593L14.9276 7.46434L18.6676 11.1554V0.666992Z"
        fill={fill}
      />
    </svg>
  );
};

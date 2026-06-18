interface Props {
  children?: string;
  chars?: number;
  ellipsis?: string;
}

const Truncate = ({ children, chars = 20, ellipsis = '...' }: Props) => {
  const result = children?.length > chars ? children?.slice(0, chars) + ellipsis : children;

  return <>{result}</>;
};

export default Truncate;

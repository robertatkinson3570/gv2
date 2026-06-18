import styles from './styles';

interface Props {
  show: boolean;
}

export const CraftingGlitter = ({ show }: Props): JSX.Element => {
  return (
    <>
      {show && (
        <div className="glitter-container">
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
      <style jsx>{styles}</style>
    </>
  );
};

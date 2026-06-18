import styles from './styles';

interface Props {
  size?: number;
  color?: string; // 'white' | 'pink' | 'purple';
}

export const Loader = ({ size = 0.5, color }: Props): JSX.Element => {
  return (
    <>
      <div className={`lds-roller ${color ?? ''}`} style={{ fontSize: `${size}rem`, width: `${size * 8.125}rem`, height: `${size * 8.125}rem` }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

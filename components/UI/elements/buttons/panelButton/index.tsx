import styles from './styles';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color?: 'purple' | 'info' | 'guide';
}

export const PanelButton = ({ color = 'purple', ...props }: Props): JSX.Element => {
  return (
    <>
      <button {...props} className={`panel-button ${color}`}>
        <div className="cap left"></div>
        <div className="cap right"></div>
        {props.children}
      </button>
      <style jsx>{styles}</style>
    </>
  );
};

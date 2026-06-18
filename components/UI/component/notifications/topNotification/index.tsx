import styles from './styles';

interface Props {
  children: React.ReactNode;
}

export const TopNotification = ({ children }: Props): JSX.Element => {
  return (
    <>
      <div className="notification-container">{children}</div>
      <style jsx>{styles}</style>
    </>
  );
};

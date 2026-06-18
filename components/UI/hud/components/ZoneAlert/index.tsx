import { useEffect, useState } from 'react';
import styles from './styles';

interface Props {
  district: number;
}

export const ZoneAlert = ({ district }: Props): JSX.Element => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show && district) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [district]);

  if (!show) return <></>;
  return (
    <>
      <div className="alert-container">
        <p>You have entered</p>
        <h1>District {district}</h1>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

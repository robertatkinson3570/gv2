import React, { ReactNode, ReactNodeArray } from 'react';
import { WarningIcon } from '../../assets/icons';
import Image from 'next/image';
import styles from './styles';

interface WarningAreaProps {
  title?: string | null | ReactNodeArray;
  children?: ReactNode;
  withMargin?: boolean;
  orangeFill?: boolean;
}

export const WarningArea = ({ title, children }: WarningAreaProps): JSX.Element => {
  return (
    <div className="warning-area">
      <div className={`top-line ${children ? 'topLine' : ''}`}>
        {title && (
          <p>
            <Image src={WarningIcon} alt="warning" />
            {title}
          </p>
        )}
      </div>

      {!!children && <div className="content">{children}</div>}

      <style jsx>{styles}</style>
    </div>
  );
};

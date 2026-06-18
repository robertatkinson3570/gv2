import styles from './styles';
import { ModalWrapper } from '..';
import { BasePanel } from '../..';
import { CloseButton } from 'components/UI/elements';

interface Props {
  title?: string | { value?: string; fontSize?: number; width?: string; padding?: string; component?: React.ReactNode };
  open: boolean;
  secondaryColor?: boolean;
  color?: string;
  hideClose?: boolean;
  onClose: () => void;
  light?: boolean;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  scrollable?: boolean;
  children: React.ReactNode;
}

export const Modal = ({
  title,
  leftPanel,
  rightPanel,
  secondaryColor,
  open,
  color,
  onClose,
  hideClose,
  light = false,
  scrollable,
  children,
}: Props): JSX.Element => {
  return (
    <>
      <ModalWrapper open={open} onClose={onClose} hideClose={hideClose} light={light} leftPanel={leftPanel} rightPanel={rightPanel}>
        {/* <IndentedPanel secondaryColor={secondaryColor} title={title} borrowedColor={color === 'info'} useTheme={!secondaryColor}>
          {children}
        </IndentedPanel> */}
        <BasePanel
          inherit={{
            width: false,
            height: false,
          }}
          title={{
            value: typeof title === 'string' ? title : title?.value ?? null,
            color: 'white',
            padding: typeof title === 'string' ? '0.25rem 1.6rem 0.25rem 1.6rem' : title?.padding,
            width: typeof title === 'string' ? '32rem' : title?.width,
            fontSize: typeof title === 'string' ? 2.8 : title?.fontSize,
            component: typeof title !== 'string' && title?.component,
          }}
          sides={{
            color: secondaryColor ? 'purple-400' : `${color ?? 'default'}-border`,
            size: 15,
            thickness: 4,
          }}
          content={{
            padding: 1,
            scrollable,
          }}
          background={{
            color: 'black',
            opacity: 0.85,
            scanlines: {
              color: secondaryColor ? 'purple-border' : `${color ?? 'default'}-border`,
              opacity: 0.15,
              spacing: 0.8,
              size: 0.25,
            },
            hasShadow: true,
          }}
        >
          {children}
        </BasePanel>
        {!hideClose && (
          <div className="close-icon-container">
            <CloseButton onClick={onClose} size={3.5} secondary={secondaryColor} color={color} />
          </div>
        )}
      </ModalWrapper>
      <style jsx>{styles}</style>
    </>
  );
};

import useAavegotchiSound from 'hooks/useAavegotchiSound';
import styles from './styles';
import Image from 'next/image';
import { ChannelIcon3d, ChannelIcon3dActive } from 'assets';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  borderColor?: string;
  backgroundColor?: string;
  label?: string;
  active?: boolean;
  size?: string;
  noGlow?: boolean;
}

export const ChannelReadyToggle = ({ borderColor, backgroundColor, label, size = '3.5rem', active, noGlow, ...props }: Props): JSX.Element => {
  const { click } = useAavegotchiSound();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    click();
    if (props?.onClick) props.onClick(e);
  };

  return (
    <>
      <button {...props} onClick={handleClick}>
        <div className="img-container">
          <Image alt="" src={active ? ChannelIcon3dActive : ChannelIcon3d} layout="fill" objectFit="cover" />
        </div>
        {label && <span className="label">{label}</span>}
      </button>
      <style jsx>{`
        button {
          --color: var(--col-${active ? 'yellow-border' : 'info-400'});
          --bg-color: ${backgroundColor || 'transparent'};
          --border-color: ${active ? 'var(--col-yellow-border)' : borderColor || 'none'};
          --icon-width: ${size};
          --icon-height: ${size};
          --justify-content: ${label?.length ? 'flex-start' : 'center'};
          --box-shadow: ${!noGlow && active ? '0px 0px 5px #ffd600' : 'none'};
        }
      `}</style>
      <style jsx>{styles}</style>
    </>
  );
};

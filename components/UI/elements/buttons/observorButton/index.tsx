import { ObservorLive, NakeyGotchi } from 'assets';
import { BasePanel } from 'components/UI/component';
import Image from 'next/image';
import styles from './styles';

interface Props {
  isNakedGotchi: boolean;
  onClick: () => void;
}

export const ObservorButton = ({ isNakedGotchi, onClick }: Props): JSX.Element => {
  return (
    <>
      <div className="container scale-100 hover:scale-105 duration-150 ease-out" onClick={onClick}>
        <div className="icon">
          <Image alt="" src={isNakedGotchi ? NakeyGotchi : ObservorLive} layout="responsive" objectFit="cover" />
        </div>
        <div className="btn-panel">
          <BasePanel
            inherit={{
              width: true,
              height: true,
            }}
            content={{
              padding: 0,
              color: 'info-200',
            }}
            hideSides={{ left: true }}
            sides={{
              color: 'magenta-200',
              size: 6,
            }}
            background={{
              color: 'grad-magenta-3',
              hasShadow: true,
            }}
          >
            <div className="label uppercase">{isNakedGotchi ? 'Join as a Nakey Gotchi' : 'Join as an Observoor'}</div>
          </BasePanel>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

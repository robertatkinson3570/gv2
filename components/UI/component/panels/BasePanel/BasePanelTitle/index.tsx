import { useMemo } from 'react';
import { Background, Content, SideConfig, Title } from '../types';
import styles from './styles';

interface Props {
  title: Title | string;
  sides: SideConfig;
  content: Content;
  background: Background;
}

export const BasePanelTitle = ({ title, sides, content, background }: Props) => {
  const titleConfig = useMemo(() => (typeof title === 'string' ? undefined : title), [title]);
  const titleValue = useMemo(() => (typeof title === 'string' ? title : title?.value ?? ''), [title]);

  return (
    <div className={`panel-title ${titleConfig?.component ? 'panel-title-component' : ''}`}>
      {titleConfig?.component && (
        <div
          className="absolute -translate-y-1/2 w-full h-fit flex items-center justify-center"
          style={{
            zIndex: 3,
          }}
        >
          {titleConfig?.component}
        </div>
      )}
      {!titleConfig?.component && titleValue && (
        <div className="absolute -translate-y-1/2 w-fit h-fit border-solid mx-auto rounded-[0.6rem] flex items-center justify-center">
          <h2 className="uppercase mx-auto my-0 p-0">{titleValue}</h2>
        </div>
      )}
      <style jsx>{`
        .panel-title {
          --border-color: var(--col-${sides?.color ?? 'pink-300'});
          --title-font-size: ${titleConfig?.fontSize ?? '2.8'}rem;
          --title-font-family: ${typeof title === 'object' ? title?.fontFamily ?? 'Pixelar' : 'Pixelar'};
          --title-border-size: ${titleConfig?.borderSize || 0.4}rem;
          --title-color: var(--col-${titleConfig?.color ?? content?.color ?? 'white'});
          --title-bg-color: var(--col-${titleConfig?.background ?? background?.color ?? 'black'});
          --title-width: ${titleConfig?.width ?? 'fit-content'};
          --title-padding: ${titleConfig?.padding ?? '0.3rem 2.4rem'};
          --title-filter: ${titleConfig?.hasShadow || background?.hasShadow ? 'drop-shadow(0 0 0.4rem var(--border-color))' : 'none'};
        }
      `}</style>
      <style jsx>{styles}</style>
    </div>
  );
};

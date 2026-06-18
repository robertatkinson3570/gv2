/* eslint-disable multiline-ternary */
import { useMemo } from 'react';
import { BasePanelOutline } from './BasePanelOutline';
import { BasePanelTitle } from './BasePanelTitle';
import { Background, Content, Inheritance, SideConfig, SideVisibility, Title } from './types';

export interface BasePanelProps {
  children: React.ReactNode;
  inherit?: Inheritance;
  hideSides?: SideVisibility;
  sides?: SideConfig;
  title?: string | Title;
  content?: Content;
  fontFamily?: 'Pixelar' | 'Alien Encounters Solid';
  background?: Background;
}

const defaultScanlines = {
  color: 'purple-400',
  opacity: 0.2,
  spacing: 0.75,
  size: 0.2,
};

export const BasePanel = ({
  inherit = {
    width: true,
    height: true,
  },
  title,
  hideSides = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  },
  sides = {
    size: 10,
    color: 'pink-350',
  },
  content = {
    color: 'white',
    padding: 5,
    scrollable: true,
  },
  background = {
    hasShadow: true,
    color: 'black',
    opacity: 1,
    scanlines: defaultScanlines,
  },
  children,
}: BasePanelProps): JSX.Element => {
  const secondaryHasShadow = useMemo(() => (typeof sides?.secondarySides === 'object' ? sides?.secondarySides?.shadow : false), [sides]);
  const backgroundConfig = useMemo(
    () => ({
      ...background,
      scanlines: {
        ...(typeof background?.scanlines === 'object'
          ? { ...defaultScanlines, ...background.scanlines }
          : background.scanlines === true
            ? defaultScanlines
            : undefined),
      },
    }),
    [background],
  );

  return (
    <div className={`base-panel-wrapper relative ${inherit?.width ? 'w-fit' : 'w-full'} ${inherit?.height ? 'h-fit' : 'h-full'}`}>
      {title && <BasePanelTitle title={title} sides={sides} content={content} background={background} />}

      {sides?.secondarySides ? (
        <BasePanelOutline
          hideSides={hideSides}
          sides={{
            ...sides,
            size: typeof sides?.secondarySides === 'object' ? sides?.secondarySides?.size : 2,
            thickness: typeof sides?.secondarySides === 'object' ? sides?.secondarySides?.thickness : 3,
            color: typeof sides?.secondarySides === 'object' ? sides?.secondarySides?.color : sides?.color ?? 'pink-350',
          }}
          content={{ ...content, padding: typeof sides?.secondarySides === 'object' ? sides?.secondarySides?.size : 2, scrollable: false }}
          background={{ ...background, color: 'transparent', scanlines: null, hasShadow: secondaryHasShadow }}
          wrapClassName="outer"
        >
          <BasePanelOutline
            hideSides={hideSides}
            sides={{ ...sides, secondarySides: null, thickness: sides?.thickness ?? 3 }}
            content={content}
            background={backgroundConfig}
            wrapClassName="inner"
          >
            {children}
          </BasePanelOutline>
        </BasePanelOutline>
      ) : (
        <BasePanelOutline hideSides={hideSides} sides={sides} content={content} background={backgroundConfig}>
          {children}
        </BasePanelOutline>
      )}
    </div>
  );
};

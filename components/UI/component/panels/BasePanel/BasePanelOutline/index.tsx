/* eslint-disable @typescript-eslint/indent */
// import { useRealm } from 'contexts/RealmContext';
import { useMemo } from 'react';
import { BasePanelProps } from '../index';
import styles from './styles';

interface Props extends BasePanelProps {
  wrapClassName?: 'outer' | 'inner';
}

export const BasePanelOutline = ({ hideSides, sides, content, background, children, wrapClassName = 'inner' }: Props): JSX.Element => {
  const hasTop = useMemo(() => !hideSides?.top, [hideSides]);
  const hasBottom = useMemo(() => !hideSides?.bottom, [hideSides]);
  const hasLeft = useMemo(() => !hideSides?.left, [hideSides]);
  const hasRight = useMemo(() => !hideSides?.right, [hideSides]);
  const scrollClassName = useMemo(() => (content?.scrollable ? 'scrollable' : ''), [content]);

  const scanlineConfig = useMemo(
    () => ({
      opacity: typeof background?.scanlines === 'object' ? background?.scanlines?.opacity : 0.12,
      spacing: typeof background?.scanlines === 'object' ? background?.scanlines?.spacing : 0.8,
      color: typeof background?.scanlines === 'object' ? background?.scanlines?.color : 'rgba(0, 185, 225, 0.12)',
      size: typeof background?.scanlines === 'object' ? background?.scanlines?.size : 0.6,
    }),
    [background?.scanlines],
  );

  const doubleBorderSpacing = useMemo(
    () => (typeof sides?.secondarySides === 'object' ? sides?.secondarySides?.spacing : sides?.secondarySides ? sides?.thickness ?? 5 : 0),
    [sides?.secondarySides, sides?.thickness],
  );
  const thickness = useMemo(() => sides?.thickness ?? 3, [sides?.thickness]);
  const sideSize = useMemo(() => sides?.size ?? 0, [sides?.size]);
  const borderFilter = useMemo(
    () => (typeof sides?.secondarySides === 'object' && sides?.secondarySides?.shadow ? 'drop-shadow(0 0 .6rem var(--border-color))' : 'none'),
    [sides?.secondarySides],
  );

  return (
    <>
      <div className={`panel-outline w-full h-full ${wrapClassName}`}>
        <div className="border-wrap w-full h-full"></div>
        <div
          className={`clip-content w-full h-full ${scrollClassName} ${
            typeof background?.scanlines !== null || background?.scanlines === true ? 'scanlines' : ''
          }`}
        >
          {children}
        </div>
      </div>

      <style jsx>{`
        .panel-outline {
          --border-color: var(--col-${sides?.color ?? 'pink-300'});
          --border-size: ${thickness}px;
          --content-color: var(--col-${content?.color}, white);
          --content-padding: ${content?.padding ?? 0}px;
          --content-filter: ${background?.hasShadow ? 'drop-shadow(0 0 .6rem var(--border-color))' : 'none'};
          --border-filter: ${borderFilter};
          --content-shadow: ${background?.hasShadow ? '0 0 0.8rem var(--border-color)' : 'none'};
          --bg: var(--col-${background?.color}, transparent);
          --bg-opacity: ${background?.opacity ?? 0.85};

          --double-border-spacing: ${doubleBorderSpacing}px;
          --cap-top: ${hasTop ? sides?.top ?? sideSize : 0}px;
          --cap-right: ${hasRight ? sides?.right ?? sideSize : 0}px;
          --cap-bottom: ${hasBottom ? sides?.bottom ?? sideSize : 0}px;
          --cap-left: ${hasLeft ? sides?.left ?? sideSize : 0}px;

          --bst: ${hasTop ? `${thickness}px` : '0px'};
          --bsr: ${hasRight ? `${thickness}px` : '0px'};
          --bsb: ${hasBottom ? `${thickness}px` : '0px'};
          --bsl: ${hasLeft ? `${thickness}px` : '0px'};

          --scanline-bg: linear-gradient(
            to bottom,
            var(--col-${scanlineConfig.color}),
            var(--col-${scanlineConfig.color}) ${scanlineConfig.size}rem,
            transparent ${scanlineConfig.size}rem,
            transparent 100%
          );
          --scanline-spacing: ${scanlineConfig.spacing}rem;
          --scanline-opacity: ${scanlineConfig.opacity};
          --scanline-color: ${scanlineConfig.color};

          // Outer (Clockwise)
          --clip-path-outer: var(--cap-left) var(--cap-top), var(--cap-left) 0, calc(100% - var(--cap-right)) 0,
            calc(100% - var(--cap-right)) var(--cap-top), 100% var(--cap-top), 100% calc(100% - var(--cap-bottom)),
            calc(100% - var(--cap-right)) calc(100% - var(--cap-bottom)), calc(100% - var(--cap-right)) 100%, var(--cap-left) 100%,
            var(--cap-left) calc(100% - var(--cap-bottom)), 0 calc(100% - var(--cap-bottom)), 0 var(--cap-top), var(--cap-left) var(--cap-top);

          // Inner (Counter-clockwise)
          --clip-path-inner: calc(var(--cap-left) + var(--bsl)) calc(var(--cap-top) + var(--bst)), var(--bsl) calc(var(--cap-top) + var(--bst)),
            var(--bsl) calc(100% - var(--cap-bottom) - var(--bsb)), calc(var(--cap-left) + var(--bsl)) calc(100% - var(--cap-bottom) - var(--bsb)),
            calc(var(--cap-left) + var(--bsl)) calc(100% - var(--bsb)), calc(100% - var(--cap-right) - var(--bsr)) calc(100% - var(--bsb)),
            calc(100% - var(--cap-right) - var(--bsr)) calc(100% - var(--cap-bottom) - var(--bsb)),
            calc(100% - var(--bsr)) calc(100% - var(--cap-bottom) - var(--bsb)), calc(100% - var(--bsr)) calc(var(--cap-top) + var(--bst)),
            calc(100% - var(--cap-right) - var(--bsr)) calc(var(--cap-top) + var(--bst)), calc(100% - var(--cap-right) - var(--bsr)) var(--bst),
            calc(var(--cap-left) + var(--bsl)) var(--bst), calc(var(--cap-left) + var(--bsl)) calc(var(--cap-top) + var(--bst));
        }
      `}</style>
      <style jsx>{styles}</style>
    </>
  );
};

import styles from './styles';

interface Props {
  children: React.ReactNode;
  padding?: number;
  title?: string | { value: string; fontSize: string };
  inheritWidth?: boolean;
  inheritHeight?: boolean;
}

export const BigIndentedPanel = ({ children, padding = 1.6, title, inheritWidth, inheritHeight }: Props): JSX.Element => {
  const getMargin = (hasTitle: boolean) => {
    return `${hasTitle ? padding : 0} ${padding}rem 0`;
  };

  return (
    <>
      <div className="outer">
        <div
          className="box-holder"
          style={{ margin: getMargin(!!title), width: inheritWidth ? '100%' : 'fit-content', height: inheritHeight ? '100%' : 'fit-content' }}
        >
          {!!title && (
            <div className="title-panel">
              <h2 style={{ fontSize: typeof title === 'string' ? '4.2rem' : title.fontSize }}>{typeof title === 'string' ? title : title.value}</h2>
            </div>
          )}
          <div className="shadow">
            <div
              className="content"
              style={{
                width: 'fit-content',
                padding: '.3rem',
                minHeight: inheritHeight ? '100%' : 'auto',
              }}
            >
              <div
                className="inner"
                style={{
                  height: `calc(100% + ${title ? padding + 1.2 : padding}rem)`,
                  padding: `${title ? padding + 1.2 : padding}rem 0 ${padding + 0.5}rem`,
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    </>
  );
};

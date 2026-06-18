import React, { useState, ReactNode } from 'react';
import styles from './styles';

interface TabViewProps {
  title: string;
  height?: string;
  children: ReactNode;
}

interface TabsBaseProps {
  onChange?: (index: number) => void;
  children: React.ReactElement<TabViewProps> | Array<React.ReactElement<TabViewProps>>;
}

export const TabView: React.FC<TabViewProps> = ({ children }) => {
  return (
    <>
      <>{children}</>
      <style jsx>{styles}</style>
    </>
  );
};

export const TabsBase: React.FC<TabsBaseProps> = ({ onChange, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index: number) => {
    setActiveTab(index);
    if (onChange) onChange(index);
  };

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <>
      <div className="tabs-container">
        <ul className={`tabs-header ${childrenArray.length > 1 ? 'multiple' : ''}`}>
          {React.Children.map(childrenArray, (child, index) => (
            <li
              key={index}
              className={`${childrenArray.length > 1 ? 'clickable' : ''}${activeTab === index ? ' active' : ''}`}
              onClick={() => handleClick(index)}
            >
              {child.props.title}
            </li>
          ))}
        </ul>
        <div className="tabs-content scrollable info">{React.Children.toArray(childrenArray)[activeTab]}</div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

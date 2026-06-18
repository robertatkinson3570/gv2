/* eslint-disable multiline-ternary */
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { useEffect, useRef, useState } from 'react';
import styles from './styles';
import Image from 'next/image';
import { IndentedPanel } from 'components/UI/component';

interface Props {
  icon: string;
  children: React.ReactNode;
  secondaryColor?: boolean;
}

export const DropdownMenu = ({ icon, children, secondaryColor }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const { click, back } = useAavegotchiSound();

  const containerClick = (e) => {
    blockPropagation(e);
    if (!open) {
      click();
      setOpen(true);
    }
  };

  const blockPropagation = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const toggleClick = (event) => {
    blockPropagation(event);
    open ? back() : click();
    setOpen((prevState) => !prevState);
  };

  const onCloseHandler = (e) => {
    e.stopPropagation();
    const pathObj = e.composedPath();
    let isDropdown = false;
    for (let i = 0; i < pathObj.length; i++) {
      if (isDropdown) break;
      if ((pathObj[i] as HTMLInputElement).classList === undefined) continue;
      for (let j = 0; j < (pathObj[i] as HTMLInputElement).classList.length; j++) {
        if ((pathObj[i] as HTMLInputElement).classList[j] === 'dropdown-container') {
          isDropdown = true;
          break;
        }
      }
    }
    if (!isDropdown) {
      if (openRef.current) {
        toggleClick(e);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', onCloseHandler);
    return () => window.removeEventListener('mousedown', onCloseHandler);
  }, []);

  const DropDownContent = () => {
    return (
      <IndentedPanel hideSides={{ top: true }} padding={1} secondaryColor={secondaryColor} isSetting={true} isThin={true}>
        <div className="inner-container">
          <div className="dropdown-content">{children}</div>
        </div>
      </IndentedPanel>
    );
  };

  return (
    <>
      <div className={`dropdown-container ${open ? 'open' : ''}`} onClick={containerClick}>
        <div className="toggle setting-ico flex-c-c " onClick={toggleClick}>
          <Image alt="" src={icon} width={30} height={30} objectFit="contain" />
        </div>
        {open ? (
          <div className="dropdown-content-wrapper">
            <DropDownContent />
          </div>
        ) : null}
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

import { useState, useRef } from 'react';
import styles from './styles';
import { Inventory } from '../Inventory';
import { HammerIcon, UpgradesIcon } from 'assets';
import { Upgrades } from '../Upgrades';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { IndentedPanel } from 'components/UI/component';
import { Tab } from 'components/UI/elements';

interface Props {
  currentBlock: number;
  isParcel?: boolean;
}

export const SideTray = ({ currentBlock, isParcel = true }: Props): JSX.Element => {
  const { click, back } = useAavegotchiSound();

  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'inventory' | 'upgrades'>('inventory');

  return (
    <>
      <div className="panel-wrapper">
        <IndentedPanel
          hideSides={{ right: true, bottom: true }}
          borrowedColor
          isSidePanelFrame={true}
          inheritHeight
          title={{ value: activeTab, fontSize: '4rem' }}
        >
          <div className={`sidetray-content ${activeTab}`}>
            {activeTab === 'inventory' && <Inventory isParcel={isParcel} />}
            {activeTab === 'upgrades' && <Upgrades currentBlock={currentBlock} expanded={expanded} />}
          </div>
        </IndentedPanel>
        <div className="tab-container">
          <Tab img={UpgradesIcon} onClick={() => setActiveTab('upgrades')} active={activeTab === 'upgrades'} />
          <Tab img={HammerIcon} onClick={() => setActiveTab('inventory')} active={activeTab === 'inventory'} />
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

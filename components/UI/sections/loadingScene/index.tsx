import { CauldronGif, GotchiverseLoading, LightIcon, LoadingAarenaBg, LoadingBackground } from 'assets';
import Image from 'next/image';
import styles from './styles';
import { useEffect, useState } from 'react';
const randomTips = [
  'Did you know you can spin your Gotchi by pressing "N"? Give it a whirrrrl.',
  'FYI laptop warriors can use classic WASD movement keys along with Q and R keys for combat!',
  'Deposit Alchemica into the gasless Gotchiverse in-game PLAYER WALLET to use for SUPER CHAT tipping and make it rain Alchemica!',
  'Earn XP and level up your Gotchi by voting for DAO proposals at vote.aavegotchi.com',
  'Have you tried your hand at smelting and forging? The Aavegotchi Forge is live at dapp.aavegotchi.com/forge!',
  'Trouble keeping up with Aavegotchi news? blog.aavegotchi.com is your Fren! (Also @aavegotchi on Twitter)',
  'Mouse over the bottom left Gotchi profile picture to see how your Gotchi Stats + Wearables are boosting your Gotchi!',
  "ProtoLick Model II is live! Summon them from the Shop but beware, they're NAASTY!",
  'ITEM SHOP purchases are auto-equipped to your Gotchi. Use the numeric shortcuts 1-4 to use or consume equipped items!',
  'Drop a trail of ALCHEMICA BREADCRUMBS by clicking on an alchemica icon in the top bar PLAYER WALLET or press key 7-9, or 0',
  'Strange Rofls have started appearing around the Saacred Roots! It\'s said they crave bits of Alchemica...',
];

interface Props {
  isAarena?: boolean;
}

export const LoadingScene = ({ isAarena = false }: Props): JSX.Element => {
  const [tip, setTip] = useState('');
  useEffect(() => setTip(randomTips[Math.floor(Math.random() * randomTips.length)]), []);
  return (
    <>
      <div className={`loading-scene ${isAarena ? 'aarena' : ''}`}>
        <div className="background-wrapper">
          <Image alt="" src={isAarena ? LoadingAarenaBg : LoadingBackground} layout="fill" className="bg-animation" objectFit="cover" />
        </div>
        <div className="content">
          <Image alt="" src={GotchiverseLoading} height={200} width={330} objectFit="contain" />
          <div className="tip-container">
            <div className="tip-icon-container">
              <Image alt="" src={isAarena ? CauldronGif : LightIcon} layout="fill" />
            </div>
            <div className="tip">{tip}</div>
          </div>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

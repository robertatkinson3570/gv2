// import { NFTDisplay } from 'components/phaser/NFTDisplay';
import { MoralisController } from 'components/controllers/moralisController';
import { NFTDisplay } from 'components/phaser/NFTDisplay';
import { _isSafeURL } from 'helpers/realm.helper';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import { useEffect } from 'react';
import { NFTDisplayData, NFTDisplayMetadata } from 'types';
import styles from './styles';

interface Props {
  nft: NFTDisplayData;
}

export const NFTGalleryCard = ({ nft }: Props): JSX.Element => {
  const [metadata, setMetadata] = useState<NFTDisplayMetadata>(undefined);
  useEffect(() => {
    void updateMetadata(nft);
  }, [nft]);

  const updateMetadata = async (nft: NFTDisplayData) => {
    const isFakeGotchi = Number(nft.collectionId) === 8;
    if (nft?.tokenUri && (isFakeGotchi || !nft.metadata?.image || !_isSafeURL(nft.metadata?.image))) {
      await NFTDisplay.updateMetadata(nft, 146, 146);
    }
    setMetadata(nft.metadata);
  };

  return (
    <>
      <div className="card-container">
        <Image alt=""
          src={metadata ? metadata.image : '/images/minimapMask.png'}
          layout="fill"
          objectFit={MoralisController.assetsConfig[nft.collectionId].isCover ? 'cover' : 'contain'}
        />
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

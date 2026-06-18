/* eslint-disable @typescript-eslint/no-var-requires */
import { Loader } from 'components/UI/elements';
import Image from 'next/image';
import { AllowedCollection } from 'types';
import styles from './styles';

interface Props {
  collection?: AllowedCollection;
}

export const NFTCollectionCard = ({ collection }: Props): JSX.Element => {
  let imgSrc;
  try {
    imgSrc = require(`assets/collections/${collection.icon}`).default;
  } catch (error) {}
  return (
    <>
      <div className="card-container">
        <div className="img-container">{imgSrc ? <Image alt="" src={imgSrc} layout="fill" objectFit="contain" /> : <Loader size={0.9} />}</div>
        <p className="collection-name">{collection.name}</p>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

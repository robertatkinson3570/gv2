import React from 'react';
// import Image from 'next/image';
import { ChainId } from '../../../../data-provider/chains';
import { getNetworkConfig } from '../../../../data-provider/config';
import messages from './messages';
import styles from './styles';
import { Select } from 'components/UI/elements';

interface SelectPreferredNetworkProps {
  preferredNetwork: ChainId;
  onSelectPreferredNetwork: (network: ChainId) => void;
  supportedNetworks: ChainId[];
}

export const SelectPreferredNetwork = ({
  preferredNetwork,
  onSelectPreferredNetwork,
  supportedNetworks,
}: SelectPreferredNetworkProps): JSX.Element => {
  const getFormattedName = (chainId: ChainId) => {
    const config = getNetworkConfig(chainId);
    if (config?.isFork) return messages.forkNetwork.replace('{network}', config.name);
    if (config?.isTestnet) return messages.testNetwork.replace('{network}', config.name);
    return messages.mainnet.replace('{network}', config.name);
  };

  return (
    <div className="select-preferred-network">
      <p className="title">{messages.title}</p>
      <Select
        width="20rem"
        options={supportedNetworks.map((id) => {
          return { name: getFormattedName(id), value: id.toString() };
        })}
        value={preferredNetwork.toString()}
        onSelect={(value) => onSelectPreferredNetwork(Number(value))}
      />

      <style jsx>{styles}</style>
    </div>
  );
};

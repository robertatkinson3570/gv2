import { ChainId } from '../chains';

export interface ExplorerLinkBuilderProps {
  tx?: string;
  address?: string;
}

export interface ExplorerLinkBuilderConfig {
  baseUrl: string;
  addressPrefix?: string;
  txPrefix?: string;
}

export interface NetworkConfig {
  name: string;
  privateJsonRPCUrl?: string; // private rpc will be used for rpc queries inside the client. normally has private api key and better rate
  privateJsonRPCWSUrl?: string;
  publicJsonRPCUrl: readonly string[]; // public rpc used if not private found, and used to add specific network to wallets if user don't have them. Normally with slow rates
  publicJsonRPCWSUrl?: string;
  addresses: {
    walletBalanceProvider: string;
    /**
     * UiPoolDataProvider currently requires a non-master version
     * https://github.com/aave/protocol-v2/blob/feat/split-ui-dataprovider-logic/contracts/misc/UiPoolDataProvider.sol
     * If you deploy a market with the non default oracle or incentive controller you have to redeploy the UiPoolDataProvider as well as currently the addresses are static.
     * In the upcoming version this will no longer be needed.
     */
    uiPoolDataProvider: string;
    uiIncentiveDataProvider?: string;
    chainlinkFeedRegistry?: string;
  };
  protocolDataUrl: string;
  cachingServerUrl?: string;
  cachingWSServerUrl?: string;
  baseUniswapAdapter?: string;
  baseAsset: string;
  baseAssetWrappedAddress?: string;
  rewardTokenSymbol: string;
  rewardTokenAddress?: string;
  rewardTokenDecimals: number;
  incentivePrecision: number;
  usdMarket?: boolean;
  // function returning a link to etherscan et al
  explorerLink: string;
  explorerLinkBuilder: (props: ExplorerLinkBuilderProps) => string;
  rpcOnly: boolean;
  // set this to show faucets and similar
  isTestnet?: boolean;
  // get's automatically populated on fork networks
  isFork?: boolean;
  // contains the forked off chainId
  underlyingChainId?: number;
  bridge?: {
    brandColor: string;
    name: string;
    url: string;
    logo: string;
  };
}

export type BaseNetworkConfig = Omit<NetworkConfig, 'explorerLinkBuilder'>;

export interface MarketDataType {
  // the network the market operates on
  chainId: ChainId;
  // aToken prefix string, which will be cut of in the ui
  aTokenPrefix: string;
}

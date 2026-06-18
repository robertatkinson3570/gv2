import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { Web3Provider } from '@ethersproject/providers';
import { SecretType, VenlyProvider, WindowMode } from '@venly/web3-provider';

interface VenlyArguments {
  clientId: string;
  supportedChainIds?: number[];
  chainId: number;
  // rpcUrl?: string, //https://kovan.infura.io/v3/YOUR-PROJECT-ID
  environment: 'staging' | 'production';
  signMethod?: 'POPUP' | 'REDIRECT'; // optional, REDIRECT by default
  // bearerTokenProvider?: () => 'obtained_bearer_token' //optional, default undefined
}

const secretTypes: Partial<Record<SecretType, number>> = {
  ETHEREUM: 1,
  MATIC: 137,
  BSC: 0,
};

const getSecretTypeByChainId = (chainId: number): SecretType => {
  return (Object.keys(secretTypes).find((key) => secretTypes[key] === chainId) as SecretType) || SecretType.MATIC;
};

type NetworkP = number | { chainId: string; [key: string]: any };

export class VenlyConnector extends AbstractConnector {
  public venly: VenlyProvider;
  public venlyConnect: any;

  readonly chainId: number;
  readonly environment: 'staging' | 'production' = 'production';
  readonly signMethod?: 'POPUP' | 'REDIRECT';
  private readonly clientId: string;

  constructor({ supportedChainIds, clientId, chainId, environment, signMethod }: VenlyArguments) {
    super({ supportedChainIds });

    this.clientId = clientId;
    this.chainId = chainId;
    this.environment = environment;
    this.signMethod = signMethod || 'REDIRECT';

    this.handleOnLogout = this.handleOnLogout.bind(this);
    this.handleOnActiveWalletChanged = this.handleOnActiveWalletChanged.bind(this);
    this.handleOnError = this.handleOnError.bind(this);
  }

  private handleOnLogout(): void {
    this.emitDeactivate();
  }

  private handleOnActiveWalletChanged(account: string): void {
    this.emitUpdate({ account });
  }

  private handleOnError(error: Error): void {
    this.emitError(error);
  }

  public async activate(): Promise<ConnectorUpdate> {
    this.venly = new VenlyProvider();

    const provider = await this.getProvider();
    const account = await this.getAccount();
    this.venlyConnect = this.venly.connect;

    return { provider, account };
  }

  public async getProvider(): Promise<any> {
    return this.venly.createProvider({
      clientId: this.clientId,
      skipAuthentication: false,
      secretType: getSecretTypeByChainId(this.chainId || 137),
      environment: this.environment,
      windowMode: this.signMethod === 'REDIRECT' ? WindowMode.REDIRECT : WindowMode.POPUP,
    });
  }

  public async getChainId(): Promise<number | string> {
    const provider = await this.getProvider();
    const web3Provider = new Web3Provider(provider);

    const network = await web3Provider.getNetwork();
    return network.chainId;
  }

  public async getAccount(): Promise<null | string> {
    const provider = await this.getProvider();
    const web3Provider = new Web3Provider(provider);
    const accounts = await web3Provider.listAccounts();

    return accounts[0];
  }

  public deactivate() {
    console.log('Handle deactive: No native Venly listeners to deactivate.');
  }

  public async changeNetwork(newNetwork: number | NetworkP, isGasRelayEnabled?: boolean) {
    const chainId = typeof newNetwork === 'number' ? newNetwork : newNetwork.chainId;
    const secretType = getSecretTypeByChainId(this.chainId || 137);
    const provider = await this.venly.changeSecretType(secretType, String(chainId));
    this.emitUpdate({ chainId, provider });
  }

  public async close() {
    await this.venly.logout();
    this.emitDeactivate();
  }
}

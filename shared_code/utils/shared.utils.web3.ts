require('dotenv').config();

const ethers = require('ethers');
import { varsForNetwork, abis } from '../web3/shared.const.web3'
import { chainIdToName } from './shared.utils.ethers'

const unsignedcontracts = {};
const signedContracts = {};
const provider = {};

export const getContract = (network, contractName = 'realmDiamond', privateKey?) => {
  const vars = varsForNetwork(network);
  const chainId = chainIdToName(network);
  // @ts-ignore
  const provider = new ethers.providers.StaticJsonRpcProvider({
    url: vars.jsonRPC,
    allowGzip: true,
  }, chainId);
  let wallet;
  if (privateKey) {
    wallet = new ethers.Wallet(privateKey, provider);
  }
  const contracts = wallet ? signedContracts : unsignedcontracts;
  const abi = abis[contractName] || abis.erc20;

  if (!contracts[contractName]) {
    try {
      contracts[contractName] = new ethers.Contract(vars[contractName], abi, wallet || provider);
    } catch (err) {
      // Contract not available
    }
  }

  // console.log(contractName, contracts[contractName]);
  return contracts[contractName] || undefined;
};

export const getProvider = (network) => {
  const vars = varsForNetwork(network);
  // @ts-ignore
  if (!provider.network) {
    // @ts-ignore
    const currentProvider = new ethers.providers.StaticJsonRpcProvider({
      url: vars.jsonRPC,
      allowGzip: true,
    });
    // @ts-ignore
    provider.network = currentProvider;
  }
  // @ts-ignore
  return provider.network;
};

export const useDiamondCall = async (network, diamondName = 'realmDiamond', method) => {
  const contract = getContract(network, diamondName);
  const { name, parameters } = method;
  const res = await (parameters ? contract[name](...parameters) : contract[name]());
  return res;
};

export const getAlchemicaBalances = async (address, network) => {
  const fud = getContract(network, 'fudAddress');
  const fomo = getContract(network, 'fomoAddress');
  const alpha = getContract(network, 'alphaAddress');
  const kek = getContract(network, 'kekAddress');

  const fudBalance = Number(ethers.utils.formatEther(await fud.balanceOf(address)));
  const fomoBalance = Number(ethers.utils.formatEther(await fomo.balanceOf(address)));
  const alphaBalance = Number(ethers.utils.formatEther(await alpha.balanceOf(address)));
  const kekBalance = Number(ethers.utils.formatEther(await kek.balanceOf(address)));

  return [fudBalance, fomoBalance, alphaBalance, kekBalance];
};

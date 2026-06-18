import { useSubgraphCall } from '../utils/shared.utils.ethers'
import { getContract } from '../utils/shared.utils.web3'
import { getAllAavegotchisOfOwner, getSingleGotchi } from '../web3/subgraph/queries'
const transformContractRes = (res) => {
  return {
    withSetsNumericTraits: res.modifiedNumericTraits,
    numericTraits: res.numericTraits,
    id: res.tokenId.toString(),
    withSetsRarityScore: res.modifiedRarityScore.toString(),
    baseRarityScore: res.baseRarityScore.toString(),

    owner: {
      id: res.owner.toLowerCase(),
    },
    escrow: res.escrow,
    name: res.name,
    equippedWearables: res.equippedWearables,
    level: res.level.toString(),
    experience: res.experience.toString(),
    stakedAmount: res.stakedAmount.toString(),
    collateral: res.collateral,
    kinship: res.kinship.toString(),
  };
};

// used to fetch all (or a single) gotchis by address from Core and fallback to StaticJsonRpcProvider if that fails
export const fetchUserAavegotchis = async (owner, byGotchiId?) => {
  const query = getAllAavegotchisOfOwner(owner, null, byGotchiId);
  try {
    const res = await useSubgraphCall(query);
    return res.aavegotchis;
  } catch (error) {
    // subgraph faild, fetching from the contract
    console.warn(`fetchUserAavegotchis owner: ${owner} byGotchiId: ${byGotchiId} failed. Falling back to StaticJsonRpcProvider! Error: ${JSON.stringify(error?.message || {})}`);
    const aavegotchiContract = getContract('matic', 'aavegotchiDiamond');
    if (!aavegotchiContract) return;
    const res = await aavegotchiContract.allAavegotchisOfOwner(owner);
    let gotchis = res.filter((gotchi) => Number(gotchi.status) === 3).map((gotchi) => transformContractRes(gotchi));
    if (byGotchiId) {
      gotchis = gotchis.filter(gotchi => gotchi.id === byGotchiId);
    }
    return gotchis;
  }
};

const fetchSingleGotchi = async (byGotchiId) => {
  const query = getSingleGotchi(byGotchiId);
  try {
    const res = await useSubgraphCall(query);
    return res.aavegotchis;
  } catch (error) {
    console.warn(`fetchWearables error: ${JSON.stringify(error?.message || {})}`);
  }
};

module.exports = { fetchUserAavegotchis, fetchSingleGotchi };

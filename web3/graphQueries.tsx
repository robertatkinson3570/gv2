export function userOrders(userID: string, viewAll: boolean) {
  return `
{ orders(first:${viewAll ? 1000 : 5}, orderBy:batchId, orderDirection:desc, where:{createdBy:"${userID}"}) {
      id
      txnId
      claimId
      batchId
      type
      createdBy
      status
      price
      value
      reserveRatio
      time
      ghst
      dai
    }
  }
`;
}

export function ownerAavegotchisQuery(id: string) {
  return `
  {users(where:{id:"${id.toLowerCase()}"}) {
  id
  gotchisOwned {
    id
    name
    baseRarityScore
    equippedWearables
    kinship
    level
    collateral
  }
  }}
`;
}

export const latestOrders = `
{
    orders(first:30, orderBy:batchId, orderDirection:desc) {
      id
      txnId
      claimId
      batchId
      type
      createdBy
      status
      price
      value
      reserveRatio
      time
      ghst
      dai
    }
  }
`;

export const getAuctionQuery = (auctionType: 'erc1155' | 'erc721', tokenId: string, contractAddress: string): string => {
  const query = `
    {
      auctions(where: {
        tokenId: "${tokenId}",
        type: "${auctionType}",
        contractAddress:"${contractAddress}"
      }) {
        id
      tokenId
      orderId
      type
      tokenIndex
      startTime
      endTime
      contractAddress
      highestBid
      highestBidder
      lastBidTime
      totalBids
      hammerTimeDuration
      bidDecimals
      stepMin
      incMin
      incMax
      bidMultiplier
      claimed
      incentivePreset
      }
    }`;

  return query;
};

const boostIndexToName = (index: number) => {
  switch (index) {
    case 0:
      return 'fud';
    case 1:
      return 'fomo';
    case 2:
      return 'alpha';
    case 3:
      return 'kek';
    default:
      return 'none';
  }
};

export const getUsersActiveBids = (account: string, contractAddress: string): string => {
  return `{
    auctions(first: 1000, where: { contractAddress:"${contractAddress}"  claimed:false, highestBidder: "${account.toLowerCase()}" }) {
      highestBid
      endTime
      incentivePreset
      id
      tokenId
      lastBidTime
    }
  }`;
};

export const getUserBids = (account: string, contractAddress: string): string => {
  //   const outbidfilter = !filter || filter.outbid === undefined ? "" : `, outbid: ${filter.outbid}`;
  return `{
      bids(first: 500, where:{contractAddress:"${contractAddress}",bidder:"${account.toLowerCase()}", outbid:false}, orderBy: bidTime, orderDirection: desc) {
        id
        auctionID
        auctionOrderId
        auctionEndTime
        bidder
        claimed
        amount
        outbid
        bidTime
        previousBid
        previousBidder
        auctionTimeLeft
        tokenId
        tokenIndex
        contractAddress
        type
      }
    }`;
};

export const getBidHistory = (contractAddress: string): string => {
  return `{
      bids(first: 200, where: {contractAddress:"${contractAddress}"}, orderBy: bidTime, orderDirection: desc) {
        bidder
        amount
        bidTime
        auctionEndTime
        tokenId
      }
  }`;
};

export function whitelistQueryByIds(ids: string[]) {
  return `
    {whitelists(where:{id_in:[${ids}]}) {
      id
      ownerAddress
      members
      name
    }}
`;
}

export const getUserIncentives = (account: string, contractAddress: string): string => {
  return `{
  incentives(orderBy:receiveTime, orderDirection:desc, first: 1000, where:{contractAddress:"${contractAddress}", earner: "${account.toLowerCase()}"}) {
    id
    amount
    auctionID
    auctionOrderId
    receiveTime
    tokenId
    tokenIndex
    contractAddress
    type
  }
}`;
};

export const getAuctionLeaderboard = (): string => {
  return `{users(orderBy:bids, orderDirection:desc) {
  id
  bids
  bidAmount
}}`;
};

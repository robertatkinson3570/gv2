export default async function postToBlockNative (transactionHash, apiKeyOverride?: string) {
  const url = 'https://api.blocknative.com/transaction';
  const apikey = process.env.BLOCKNATIVE_API_KEY;

  const payload = {
    apiKey: apiKeyOverride || apikey,
    hash: transactionHash,
    blockchain: 'ethereum',
    network: 'rinkeby',
  };

  try {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return { status: 'success', data: data };
  } catch (error) {
    return { status: 'error', error: error };
  }
}

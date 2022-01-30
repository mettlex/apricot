import { ethereumCompatRpcEndpoints } from "../constants";

export const getCurrentTimestampFromEthereum = async ({
  url,
}: {
  url: string;
}): Promise<number> => {
  const response = await (
    await fetch(url, {
      headers: {
        accept: "application/json",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
      },
      body: '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}',
      method: "POST",
    })
  ).json();

  return Number(response.result.timestamp);
};

export const requestEthereumCompatibleApi = (
  index: number,
): Promise<{ timestamp: number | null; source: string | null }> =>
  new Promise(async (resolve) => {
    try {
      const endpoint = ethereumCompatRpcEndpoints[index];

      const timestamp = await getCurrentTimestampFromEthereum({
        url: endpoint.url,
      });

      const source = endpoint.name;

      resolve({ timestamp, source });
    } catch (error) {
      console.error(error);
      resolve({ timestamp: null, source: null });
    }
  });

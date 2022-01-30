import { solanaRpcEndpoints } from "../constants";

export const getCurrentTimestampFromSolana = async ({
  url,
}: {
  url: string;
}): Promise<number> => {
  const headers = {
    "Content-Type": "application/json",
  };

  let query = `{"id":1, "jsonrpc":"2.0", "method":"getVersion"}`;

  let response = await fetch(url, {
    method: "POST",
    body: query,
    headers,
  });

  const version = (
    (await response.json()) as { result: { "solana-core": string } }
  ).result["solana-core"];

  let methodName = "getLatestBlockhash";

  if (version.startsWith("1.8")) {
    methodName = "getRecentBlockhash";
  }

  query = `{"id":1, "jsonrpc":"2.0", "method":"${methodName}"}`;

  response = await fetch(url, {
    method: "POST",
    body: query,
    headers,
  });

  const slot = (
    (await response.json()) as { result: { context: { slot: number } } }
  ).result.context.slot;

  query = `{"jsonrpc":"2.0","id":1, "method":"getBlockTime","params":[${slot}]}`;

  response = await fetch(url, {
    method: "POST",
    body: query,
    headers,
  });

  const timestamp = ((await response.json()) as { result: number }).result;

  return timestamp;
};

export const requestSolanaApi = (
  index: number,
): Promise<{ timestamp: number | null; source: string | null }> =>
  new Promise(async (resolve) => {
    try {
      const endpoint = solanaRpcEndpoints[index];

      const timestamp = await getCurrentTimestampFromSolana({
        url: endpoint.url,
      });

      const source = endpoint.name;

      resolve({ timestamp, source });
    } catch (error) {
      console.error(error);
      resolve({ timestamp: null, source: null });
    }
  });

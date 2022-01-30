import { NextApiRequest, NextApiResponse } from "next";
import {
  ethereumCompatRpcEndpoints,
  solanaRpcEndpoints,
} from "../../../utils/constants";
import { requestEthereumCompatibleApi } from "../../../utils/time/ethereum";
import { requestSolanaApi } from "../../../utils/time/solana";

export default async function time(req: NextApiRequest, res: NextApiResponse) {
  let timestamp: number | null = null;
  let source: string | null = null;

  const result = await Promise.race(
    solanaRpcEndpoints.map((_, i) => requestSolanaApi(i)),
  );

  timestamp = result.timestamp;
  source = result.source;

  if (!source || !timestamp) {
    const len = ethereumCompatRpcEndpoints.length;

    for (let i = 0; i < len; i++) {
      const result = await requestEthereumCompatibleApi(i);

      timestamp = result.timestamp;
      source = result.source;

      if (source && timestamp) {
        break;
      }
    }
  }

  if (!source || !timestamp) {
    timestamp = Math.floor(Date.now() / 1000);
    source = "centralized-server";
  }

  res.setHeader("content-type", "application/json");

  res.send(JSON.stringify({ source, timestamp }));
}

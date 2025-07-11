import { coingeckoClient } from "~/axios/coingecko-client";
import {
  rawCoinChartDataSchema,
  type CoinChartData,
  type RawCoinChartData,
} from "~/types/coin";

export type InjectCoinChartDataArgs = {
  coinId: string;
  days: number;
  precision?: number;
};

export const injectCoinChartData = async (args: InjectCoinChartDataArgs) => {
  return coingeckoClient
    .get<RawCoinChartData>(`/coins/${args.coinId}/market_chart`, {
      params: {
        vs_currency: "usd",
        days: args.days,
        precision: args.precision ?? 2,
      },
    })
    .then<RawCoinChartData>((res) => res.data)
    .then<RawCoinChartData>(rawCoinChartDataSchema.parse)
    .then<CoinChartData>((data) => ({
      marketCaps: data.market_caps.map(([timestamp, marketCap]) => ({
        timestamp,
        marketCap,
      })),
      prices: data.prices.map(([timestamp, price]) => ({
        timestamp,
        price,
      })),
      totalVolumes: data.total_volumes.map(([timestamp, totalVolume]) => ({
        timestamp,
        totalVolume,
      })),
    }))
    .catch((error) => {
      console.error(error);
      return null;
    });
};

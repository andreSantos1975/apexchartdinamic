// utils.js

import Candle from './Candle';

export function mapCandleData(responseData) {
  const candles = responseData.map(k => {
    return new Candle(k[0], k[1], k[2], k[3], k[4]);
  });
  return candles;
}

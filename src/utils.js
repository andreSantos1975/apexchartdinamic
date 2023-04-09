
import Candle from './Candle';

export function mapCandleData(responseData) {
  console.log('Utils responseData:', responseData);
  const candles = responseData.map(candleObj => {
    return new Candle(candleObj.openTime, candleObj.open, candleObj.high, candleObj.low, candleObj.close);
  });
  console.log('candle do utils:', candles);
  return candles;
}

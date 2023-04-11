

export default class Candle {
    constructor(openTime, open, high, low, close) {
        console.log(' Testando Candle Constructor:', openTime, open, high, low, close);
        this.x = new Date(openTime);
        this.y = [parseFloat(open), parseFloat(high), parseFloat(low), parseFloat(close)]
    }
}
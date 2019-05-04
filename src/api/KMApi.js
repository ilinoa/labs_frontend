import BaseApi from "./BaseApi";

class KMApi extends BaseApi {
    get apiName() {
        return 'km';
    }

    async secondLab({
        factories = [],
        sizes = [],
        prices = []
    }) {
        return await this.postRequest('second', {data: {
            factories: factories.map(BaseApi.numberizeValues),
            sizes: sizes.map(BaseApi.numberizeValues),
            prices: prices.map(price => price.map(BaseApi.numberizeValues))
        }});
    }
}

export default new KMApi();
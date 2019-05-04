import BaseApi from "./BaseApi";

class EMApi extends BaseApi {
    get apiName() {
        return 'ga';
    }

    async secondLab({floor = -2.048,ceil =  2.048 ,measures = 3,quantity = 300, iterations = 0}) {
        return this.postRequest('second', {data: {floor: Number(floor),ceil: Number(ceil),measures: Number(measures),quantity: Number(quantity), iterations: Number(iterations)}});
    }

    async firstLab({floor = -20,ceil =  -2.3,precision = 3,quantity = 300, iterations = 0}) {
        return this.postRequest('first', {data: {floor: Number(floor),ceil: Number(ceil),precision: Number(precision),quantity: Number(quantity), iterations: Number(iterations)}});
    }

    async thirdLab(quantity, iterations, weights) {
        return this.postRequest('third', {files: {weights}, data: {quantity: Number(quantity), iterations: Number(iterations)}})
    }
}

export default new EMApi();
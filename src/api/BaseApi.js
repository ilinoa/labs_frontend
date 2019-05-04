import config from '../config.json';
import {JSON_REQUEST, MULTIPART_REQUEST} from './helpers/requestTypes';
import {HTTP_OK} from './helpers/httpStatuses';
import {GET, PUT, POST, DELETE} from './helpers/httpMethods';
import ApiError from './helpers/ApiError';

export default class BaseApi {
  constructor() {
    this._apiBaseUrl = config.apiBaseUrl;
  }

  get apiName() {
    throw Error('You should implement apiName method in child class');
  }

  async getRequest(path, {params, data}) {
    return await this.makeRequest(GET, path, {params, data})
  }

  async postRequest(path, {data, params, files}) {
    if (files && Object.keys(files).length) {
      const formData = BaseApi.getFormData(data, files);

      return await this.makeRequest(POST, path, {
        data: formData,
        params,
      }, MULTIPART_REQUEST);
    }

    const json = JSON.stringify(data);

    return await this.makeRequest(POST, path, {data: json, params});
  }


  async putRequest(path, {data, params, files}) {
    if (files && Object.keys(files).length) {
      const formData = BaseApi.getFormData(data, files);

      return await this.makeRequest(PUT, path, {
        data: formData,
        params,
      }, MULTIPART_REQUEST);
    }

    const json = JSON.stringify(data);

    return await this.makeRequest(PUT, path, {data: json, params});
  }

  async makeRequest(method, path, data = {}, type = JSON_REQUEST) {
    const headers = type === JSON_REQUEST 
    ? {
      'Accept': type,
      'Content-Type': type,
    }
    : {};
    const query = BaseApi.queryParams(data.params);
    const params = {
      method,
      headers,
      body: data.data,
    };
    const response = await fetch(`${this._apiBaseUrl}/${this.apiName}/${path}${query && query.length ? `?${query}` : ''}`,params);

    const result = await BaseApi.getResultFromResponse(response);
    return result;
  }

  static queryParams(params = {}) {
    return Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  }

  static async getResultFromResponse(response) {
    const json = await response.json();

    return json;
  }

  static numberizeValues(val) {
    return Number(val)
  }

  static getFormData(data, files) {
    const formData = new FormData();

    const dataKeys = data && Object.keys(data);
    if (dataKeys && dataKeys.length) {
      dataKeys.map(key => {
        formData.append(key, data[key]);
        return null;
      });
    }

    const filesKeys = files && Object.keys(files);

    if (filesKeys && filesKeys.length) {
      filesKeys.map(key => {
        formData.append(key, files[key]);
        return null;
      });
    }

    return formData;
  }
}
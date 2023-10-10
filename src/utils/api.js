import { API_URL } from "./constants";

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

class Api {
  constructor(baseUrl, defaultHeaders) {
    this._baseUrl = baseUrl;
    this._defaultHeaders = defaultHeaders;
  }

  register(data) {
    return this._callApi('/auth/register', 'POST', {}, data);
  }

  login(data) {
    return this._callApi('/auth/login', 'POST', {}, data);
  }

  forgotPassword(data) {
    return this._callApi('/password-reset', 'POST', {}, data);
  }

  resetPassword(data) {
    return this._callApi('/password-reset/reset', 'POST', {}, data);
  }

  logout() {
    return this._callApiWithRefresh('/auth/logout', 'POST', {}, { token: localStorage.getItem(REFRESH_TOKEN) });
  }

  loadIngrediens() {
    return this._callApi('/ingredients', 'GET')
  }

  createOrder(ingredients) {
    return this._callApi('/orders', 'POST', this._authHeader(), { ingredients: ingredients })
  }

  getUser() {
    return this._callApiWithRefresh('/auth/user', 'GET', this._authHeader())
  }

  patchUser(data) {
    return this._callApiWithRefresh('/auth/user', 'PATCH', this._authHeader(), data)
  }

  async _callApiWithRefresh(resouse, method = 'GET', headers, data) {
    try {
      return await this._callApi(resouse, method, headers, data)
    }
    catch (error) {
      if (error.message === 'jwt expired') {
        const refreshData = await this._refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem(REFRESH_TOKEN, refreshData.refreshToken);
        localStorage.setItem(ACCESS_TOKEN, refreshData.accessToken);

        const newHeaders = { ...headers, ...this._authHeader() };
        return await this._callApi(resouse, method, newHeaders, data);
      } else {
        return Promise.reject(error);
      }
    };
  }

  _callApi(resouse, method, headers, data) {
    const request = {
      method: method,
      headers: {
        ...this._defaultHeaders,
        ...headers
      }
    }
    if (data) {
      request.body = JSON.stringify(data);
    }

    return fetch(this._baseUrl + resouse, request)
      .then(this._getResponseData);
  }

  _getResponseData(response) {
    return response.ok ? response.json() : response.json().then((error) => Promise.reject(error));
  }

  _authHeader() {
    return {
      authorization: localStorage.getItem(ACCESS_TOKEN)
    }
  }

  _refreshToken() {
    return this._callApi('/auth/token', 'POST', {}, { token: localStorage.getItem(REFRESH_TOKEN) });
  }
}

export const api = new Api(
  API_URL,
  {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
  });
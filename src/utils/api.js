import { API_URL } from "./constants";

class Api {
  constructor(baseUrl, defaultHeaders)
  {
    this._baseUrl = baseUrl;
    this._defaultHeaders = defaultHeaders;
  }

  loadIngrediens() {
    return this._callApi('/ingredients')
      .catch(this._logError)
  }

  createOrder(ingredients) {
    return this._callApi('/orders', 'POST', {ingredients: ingredients})
      .catch(this._logError)
  }

  _callApi(resouse, method = 'GET', data)
  {
    const request = {
      method: method,
      headers: {
        ...this._defaultHeaders
      }
    }
    if (data) {
      request.body = JSON.stringify(data);
    }
    
    return fetch(this._baseUrl + resouse)
      .then(this._getResponseData);
  }
  
  _getResponseData(response) {
    return (response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
  }

  _logError(error) {
    console.log(error);
  }
}

export const api = new Api(
  API_URL, 
  {
    'Content-Type': 'application/json',
    'Accept': "application/json",
  });
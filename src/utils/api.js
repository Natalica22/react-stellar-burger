import { API_URL } from "./constants";

async function callApi(resource, method = 'GET', obj) {
  const request = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (obj) {
    request.body = JSON.stringify(obj);
  }
  const response = await fetch(API_URL + resource, request);
  return await (response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
}

export async function loadIngrediens() {
  try {
    return callApi('ingredients');
  } catch(error) {
    console.log(error);
  }
}

export async function createOrder(ingredients) {
  try {
    return callApi('orders', 'POST', {ingredients: ingredients});
  } catch(error) {
    console.log(error);
  }
}
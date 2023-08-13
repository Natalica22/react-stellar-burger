import { API_URL } from "./constants";

async function callApi(resource, method = 'GET', data) {
  const request = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (data) {
    request.body = JSON.stringify(data);
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
import { API_URL } from "./constants";

export async function loadIngrediens() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await (response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
    return data.data;
  } catch(error) {
    console.log(error);
  }
}
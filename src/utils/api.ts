import { API_URL } from "./constants";
import { ForgotPasswordForm, RegistrationForm, ResetPasswordForm, LoginForm, RegistrationResponse, LoginResponse, Ingredient, Order, ProfileEditForm, UserResponse } from "./types";

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type RefreshTokenResponse = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
}

class Api {
  constructor(private baseUrl: string, private defaultHeaders: HeadersInit) { }

  register(data: RegistrationForm) {
    return this.callApi<RegistrationForm, RegistrationResponse>('/auth/register', 'POST', {}, data);
  }

  login(data: LoginForm) {
    return this.callApi<LoginForm, LoginResponse>('/auth/login', 'POST', {}, data);
  }

  forgotPassword(data: ForgotPasswordForm) {
    return this.callApi('/password-reset', 'POST', {}, data);
  }

  resetPassword(data: ResetPasswordForm) {
    return this.callApi('/password-reset/reset', 'POST', {}, data);
  }

  logout() {
    return this.callApiWithRefresh('/auth/logout', 'POST', {}, { token: localStorage.getItem(REFRESH_TOKEN) });
  }

  loadIngrediens() {
    return this.callApi<null, { success: boolean, data: Ingredient[] }>('/ingredients', 'GET')
  }

  createOrder(ingredients: string[]) {
    return this.callApi<{ ingredients: string[] }, { success: boolean, order: Order }>('/orders', 'POST', this.authHeader(), { ingredients: ingredients })
  }

  getUser() {
    return this.callApiWithRefresh<null, UserResponse>('/auth/user', 'GET', this.authHeader())
  }

  patchUser(data: ProfileEditForm) {
    return this.callApiWithRefresh<ProfileEditForm, UserResponse>('/auth/user', 'PATCH', this.authHeader(), data)
  }

  private async callApiWithRefresh<T, R>(resouce: string, method: HttpMethod = 'GET', headers: HeadersInit, data?: T): Promise<R> {
    try {
      return await this.callApi<T, R>(resouce, method, headers, data)
    }
    catch (e) {
      const error = e as { message: string };
      if (error.message === 'jwt expired') {
        const refreshData = await this.refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem(REFRESH_TOKEN, refreshData.refreshToken);
        localStorage.setItem(ACCESS_TOKEN, refreshData.accessToken);

        const newHeaders = { ...headers, ...this.authHeader() };
        return await this.callApi(resouce, method, newHeaders, data);
      } else {
        return Promise.reject(error);
      }
    };
  }

  private callApi<T, R>(resouce: string, method: HttpMethod, headers?: HeadersInit, data?: T) {
    const request: RequestInit = {
      method: method,
      headers: {
        ...this.defaultHeaders,
        ...headers
      }
    }
    if (data) {
      request.body = JSON.stringify(data);
    }

    return fetch(this.baseUrl + resouce, request)
      .then(response => this.getResponseData<R>(response));
  }

  private getResponseData<R>(response: Response): Promise<R> {
    return response.ok ? response.json() : response.json().then((error) => Promise.reject(error));
  }

  private authHeader(): HeadersInit {
    return {
      authorization: localStorage.getItem(ACCESS_TOKEN) as string
    }
  }

  private refreshToken() {
    return this.callApi<{ token: string | null }, RefreshTokenResponse>('/auth/token', 'POST', {}, { token: localStorage.getItem(REFRESH_TOKEN) });
  }
}

export const api = new Api(
  API_URL,
  {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json',
  });
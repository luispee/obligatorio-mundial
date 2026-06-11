import { request } from '../../../httpClient';
import { LoginRequest, RegisterRequest } from './authRequests';
import { LoginResponse, RegisterFormDataResponse } from './authResponses';

export function login(data: LoginRequest): Promise<LoginResponse> {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function register(data: RegisterRequest) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getRegisterFormData(): Promise<RegisterFormDataResponse> {
  return request('/auth/register/form-data', {
    method: 'GET',
  });
}

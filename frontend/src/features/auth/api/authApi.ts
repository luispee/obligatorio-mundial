import { request } from '../../../httpClient';
import { LoginRequest, RegisterRequest } from './authRequests';
import { LoginResponse, RegisterFormDataResponse } from './authResponses';

export function login(data: LoginRequest): Promise<LoginResponse> {
  return request('/api/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function register(data: RegisterRequest) {
  return request('/api/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getRegisterFormData(): Promise<RegisterFormDataResponse> {
  return request('/api/register-form-data', {
    method: 'GET',
  });
}

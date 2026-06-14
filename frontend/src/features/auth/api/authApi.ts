import { request } from '../../../utils/httpClient';
import { VerifyUserRequest } from '../../evento/api/eventoRequests';
import { LoginRequest, RegisterRequest, UpdateUserRequest } from './authRequests';
import { GetUserResponse, LoginResponse, RegisterFormDataResponse } from './authResponses';

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

export function verifyUser(data: VerifyUserRequest) {
  return request('/auth/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function fetchUser(): Promise<GetUserResponse> {
  return request('/auth/me', {
    method: 'GET',
  });
}

export function updateUser(data: UpdateUserRequest) {
  return request('/auth/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

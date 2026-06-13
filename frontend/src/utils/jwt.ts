import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  exp: number;
};

export function isTokenExpired(token: string) {
  const decoded = jwtDecode<JwtPayload>(token);

  return decoded.exp * 1000 < Date.now();
}

import { getFromStorage, tokenKey } from 'utils';
import http from './httpService';

const apiEndpoint = '/auth';

export const login = (credentials) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const forgot = (email) =>
  http.post(`${apiEndpoint}/forgot-password`, email);

export const reset = (token, credentials) =>
  http.post(`${apiEndpoint}/reset-password/${token}`, credentials);

export const getJwt = () => getFromStorage(tokenKey)?.token;

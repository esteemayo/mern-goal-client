import http from './httpService';

const apiEndpoint = '/auth';
const tokenKey = 'accessToken';

export const login = (credentials) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const forgot = (email) =>
  http.post(`${apiEndpoint}/forgot-password`, email);

export const reset = (token, credentials) =>
  http.post(`${apiEndpoint}/reset-password/${token}`, credentials);

export const getJwt = () => JSON.parse(localStorage.getItem(tokenKey))?.token;

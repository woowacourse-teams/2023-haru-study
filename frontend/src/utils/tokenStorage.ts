import { deleteCookie, hasCookie } from './cookie';

const tokenStorage = {
  ACCESS_TOKEN_KEY: 'accessToken',
  REFRESH_TOKEN_KEY: 'refreshToken',

  get accessToken() {
    return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  },

  setAccessToken(accessToken: string) {
    sessionStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
  },

  hasAccessToken() {
    return Boolean(this.accessToken);
  },

  hasRefreshToken() {
    return hasCookie(this.REFRESH_TOKEN_KEY);
  },

  removeAccessToken() {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
  },

  removeRefreshToken() {
    deleteCookie(this.REFRESH_TOKEN_KEY);
  },

  clear() {
    this.removeAccessToken();
    this.removeRefreshToken();
  },
};

export default tokenStorage;

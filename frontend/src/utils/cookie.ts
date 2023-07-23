export const setCookie = (key: string, value: string, expiredays: number) => {
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + expiredays);
  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; expires=${todayDate.toUTCString()};`;
};

export const getCookie = (key: string) => {
  const regex = new RegExp(`${key}=([^;]*)`);
  const match = regex.exec(document.cookie);
  return match ? decodeURIComponent(match[1]) : null;
};

export const boolCheckCookie = (key: string) => {
  return getCookie(key) !== null ? true : false;
};

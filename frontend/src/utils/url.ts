const url = {
  getPathName: () => window.location.pathname,

  changePathName: (pathname: string) => {
    window.location.pathname = pathname;
  },

  getQueryString: <T extends string>(name: string) =>
    new URL(window.location.href).searchParams.get(name) as unknown as T,

  getSearchParams: <T>() => {
    const url = new URL(window.location.href);

    const obj: Record<string, string> = {};

    url.search
      .substring(1)
      .split('&')
      .map((item) => item.split('='))
      .forEach(([key, value]) => (obj[key] = value));

    return obj as T;
  },
};

export default url;

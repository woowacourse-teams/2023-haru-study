const url = {
  getPathName: () => window.location.pathname,

  changePathName: (pathname: string) => {
    window.location.pathname = pathname;
  },

  getQueryString: <T extends string>(name: string) =>
    new URL(window.location.href).searchParams.get(name) as unknown as T,
};

export default url;

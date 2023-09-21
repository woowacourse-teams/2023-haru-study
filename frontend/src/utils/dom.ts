const dom = {
  updateTitle: (title: string) => {
    document.title = title;
  },

  updateFavicon: (path: string) => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    favicon.href = path;
  },
};

export default dom;

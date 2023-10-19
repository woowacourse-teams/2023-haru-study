let timer: NodeJS.Timeout | null = null;

function debouncing(func: () => void, timeout = 300) {
  if (timer) clearTimeout(timer);

  timer = setTimeout(func, timeout);
}

export default debouncing;

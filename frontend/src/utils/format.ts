const format = {
  date: (date: Date, delimiter?: '-' | '.') => {
    if (!delimiter) return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

    return `${date.getFullYear()}${delimiter}${date.getMonth() + 1}${delimiter}${date.getDate()}`;
  },

  time: (seconds: number) => {
    const minutesFormatted = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secondsFormatted = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');

    return `${minutesFormatted}:${secondsFormatted}`;
  },
};

export default format;

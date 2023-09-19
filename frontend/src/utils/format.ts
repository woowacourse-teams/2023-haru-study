const format = {
  date: (date: Date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`,

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

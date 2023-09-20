type Params = {
  asset: string;
  volume?: number;
  loop?: boolean;
};

const audioPlayer = ({ asset, volume = 0.5, loop = false }: Params) => {
  const audio = new Audio();
  audio.src = asset;
  audio.volume = volume;

  if (loop) {
    audio.addEventListener(
      'ended',
      () => {
        audio.currentTime = 0;
        audio.play();
      },
      false,
    );
  }

  const play = () => {
    if (audio.paused || !audio.currentTime) {
      audio.play().catch(console.error);
    }
  };

  const stop = () => {
    audio.pause();
  };

  const setVolume = (volume: number) => (audio.volume = volume / 100);

  const setAudio = (src: string) => {
    audio.src = src;
  };

  return {
    play,
    stop,
    setVolume,
    setAudio,
  };
};

export default audioPlayer;

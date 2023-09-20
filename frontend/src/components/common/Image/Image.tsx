type Props = {
  webpUrl: string[] | string;
  originUrl: string;
  alt?: string;
};

const Image = ({ webpUrl, originUrl, alt }: Props) => {
  if (typeof webpUrl === 'string') {
    webpUrl = [webpUrl];
  }

  return (
    <picture>
      {webpUrl.map((item, index) => (
        <source key={index} type="image/webp" srcSet={item} />
      ))}
      <img src={originUrl} alt={alt} />
    </picture>
  );
};

export default Image;

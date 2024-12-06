const length = 8;
const format = "avif";

const makeGroups = (): string[][] => {
  const _images: string[][] = [[], [], []];
  for (let i = 0; i < length; ++i)
    _images[i % _images.length].push(`/images/gallery-${i + 1}.${format}`);

  return _images;
};

export default makeGroups();

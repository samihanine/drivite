import NextImage, { ImageProps } from "next/image";

interface MyImageProps extends Omit<ImageProps, "width" | "height"> {
  width?: number;
  height?: number;
}

export const Image: React.FC<MyImageProps> = ({
  src,
  alt,
  width,
  height,
  ...props
}) => {
  if (!props.fill) {
    width = width || 1280;
    height = height || 720;
  }
  return (
    <NextImage src={src} alt={alt} width={width} height={height} {...props} />
  );
};

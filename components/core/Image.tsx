import NextImage, { type ImageProps } from "next/image";

const Image = ({ ...rest }: ImageProps) => <NextImage {...rest} />;

export default Image;

// For above-the-fold images, use:
// <Image priority sizes="(max-width: 768px) 100vw, 50vw" ... />

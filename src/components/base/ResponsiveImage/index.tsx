import type { ImgHTMLAttributes, JSX } from "react";

export type ResponsiveImageSource = {
  desktopSrc: string;
  mobileSrc?: string;
  desktopAvifSrc?: string;
  mobileAvifSrc?: string;
  alt: string;
};

export type ResponsiveImageProps = ResponsiveImageSource & {
  breakpoint?: number;
} & Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "src" | "srcSet" | "children"
>;

export const ResponsiveImage = ({
  desktopSrc,
  mobileSrc,
  alt,
  desktopAvifSrc,
  mobileAvifSrc,
  breakpoint = 768,
  loading = "lazy",
  decoding = "async",
  ...imageProps
}: ResponsiveImageProps): JSX.Element => {
  const mobileMedia = `(max-width: ${breakpoint}px)`;
  const resolvedMobileSrc = mobileSrc ?? desktopSrc;

  return (
    <picture>
      {mobileAvifSrc ? (
        <source srcSet={mobileAvifSrc} type="image/avif" media={mobileMedia} />
      ) : null}
      <source srcSet={resolvedMobileSrc} type="image/webp" media={mobileMedia} />
      {desktopAvifSrc ? (
        <source srcSet={desktopAvifSrc} type="image/avif" />
      ) : null}
      <source srcSet={desktopSrc} type="image/webp" />
      <img
        {...imageProps}
        src={desktopSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  );
};

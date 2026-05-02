import type { JSX } from "react";
import clsx from "clsx";
import {
  ResponsiveImage,
  type ResponsiveImageProps,
  type ResponsiveImageSource,
} from "../ResponsiveImage";
import styles from "./styles.module.css";

type Props = Omit<ResponsiveImageProps, keyof ResponsiveImageSource> & {
  sources: {
    light: ResponsiveImageSource;
    dark: ResponsiveImageSource;
  };
};

export const ThemedResponsiveImage = ({
  sources,
  className,
  ...imageProps
}: Props): JSX.Element => {
  return (
    <>
      <span className={clsx(styles.themedImage, styles.themedImageLight)}>
        <ResponsiveImage
          {...imageProps}
          {...sources.light}
          className={className}
        />
      </span>
      <span className={clsx(styles.themedImage, styles.themedImageDark)}>
        <ResponsiveImage
          {...imageProps}
          {...sources.dark}
          className={className}
        />
      </span>
    </>
  );
};

import type { ResponsiveImageSource } from "../../../../components/base/ResponsiveImage";

export type PostItem = {
  title: string;
  permalink: string;
  dateLabel: string;
  description: string;
  image: ResponsiveImageSource;
  imageWidth: number;
  imageHeight: number;
};

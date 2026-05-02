import type { ResponsiveImageSource } from "../../../../components/base/ResponsiveImage";

export type BlogPostMetadata = {
  title: string;
  permalink: string;
  date: string;
  description?: string;
  unlisted?: boolean;
};

export type BlogImage = {
  desktopSrc: string;
  mobileSrc?: string;
  width: number;
  height: number;
};

export type BlogPostMetadataModule = BlogPostMetadata & {
  frontMatter: {
    draft?: boolean;
    image?: string;
  };
};

export type BlogPostJsonModule = {
  default?: BlogPostMetadataModule;
} & BlogPostMetadataModule;

export type BlogPostData = {
  metadata: BlogPostMetadata;
  frontMatter: {
    draft?: boolean;
    image?: string;
  };
};

export type BlogPostListModule = {
  items: BlogPostMetadata[];
};

export type BlogPostListJsonModule = {
  default?: BlogPostListModule;
} & BlogPostListModule;

export type PostItem = {
  title: string;
  permalink: string;
  date: string;
  description: string;
  image: ResponsiveImageSource;
  imageWidth: number;
  imageHeight: number;
};

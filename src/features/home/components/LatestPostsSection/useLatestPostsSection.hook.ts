import type {
  BlogImage,
  BlogPostData,
  BlogPostJsonModule,
  BlogPostListJsonModule,
  PostItem,
} from "./latestPostsSection.types";

const fallbackDescription =
  "Reflexiones prácticas sobre producto, desarrollo y aprendizaje.";

const blogImageDimensions = {
  width: 1200,
  height: 800,
};

const fallbackImage = {
  src: "/img/fallback-post-image.webp",
  ...blogImageDimensions,
} satisfies BlogImage;

const blogImageContext = require.context(
  "@site/blog/img",
  false,
  /\.(avif|jpe?g|png|webp)$/,
);

const metadataContext = require.context(
  "@generated/docusaurus-plugin-content-blog/default",
  false,
  /^\.\/site-blog.*\.json$/,
);

const blogPostListModule = require(
  "@generated/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json",
) as BlogPostListJsonModule;

const blogPostList = (blogPostListModule.default ?? blogPostListModule).items;

const allPostsByPermalink = new Map<string, BlogPostData>(
  metadataContext.keys().map((modulePath) => {
    const postModule = metadataContext(modulePath) as BlogPostJsonModule;
    const post = postModule.default ?? postModule;

    return [
      post.permalink,
      {
        metadata: {
          title: post.title,
          permalink: post.permalink,
          date: post.date,
          description: post.description,
          unlisted: post.unlisted,
        },
        frontMatter: post.frontMatter,
      },
    ];
  }),
);

function getImageSrc(imageModule: string | { default?: string }): string {
  return typeof imageModule === "string"
    ? imageModule
    : (imageModule.default ?? fallbackImage.src);
}

function resolveBlogImage(imagePath?: string): BlogImage {
  if (!imagePath) {
    return fallbackImage;
  }

  const imageModulePath = imagePath.replace("./img/", "./");

  if (!blogImageContext.keys().includes(imageModulePath)) {
    return fallbackImage;
  }

  const imageModule = blogImageContext(imageModulePath) as
    | string
    | { default?: string };

  return {
    src: getImageSrc(imageModule),
    ...blogImageDimensions,
  };
}

function getLatestPosts(): PostItem[] {
  return blogPostList
    .map((post) => allPostsByPermalink.get(post.permalink))
    .filter((post): post is BlogPostData => Boolean(post))
    .filter((post) => !post.metadata.unlisted && !post.frontMatter.draft)
    .slice(0, 2)
    .map((post) => {
      const image = resolveBlogImage(post.frontMatter.image);

      return {
        title: post.metadata.title,
        permalink: post.metadata.permalink,
        date: post.metadata.date,
        description: post.metadata.description ?? fallbackDescription,
        image: image.src,
        imageWidth: image.width,
        imageHeight: image.height,
      };
    });
}

export function useLatestPostsSection(): PostItem[] {
  return getLatestPosts();
}

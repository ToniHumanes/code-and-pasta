import fs from "fs";
import path from "path";
import type { BlogContent, BlogPost } from "@docusaurus/plugin-content-blog";
import type { Plugin } from "@docusaurus/types";

const latestPostDateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function getBlogContent(allContent: Record<string, Record<string, unknown>>) {
  return allContent["docusaurus-plugin-content-blog"]?.default as
    | BlogContent
    | undefined;
}

function resolveImageImport(post: BlogPost, imagePath: unknown) {
  if (typeof imagePath !== "string") {
    return {
      desktopImportPath: undefined,
      mobileImportPath: undefined,
      desktopExpression: JSON.stringify("/img/fallback-post-image.webp"),
      mobileExpression: undefined,
    };
  }

  if (imagePath.startsWith("/") || imagePath.startsWith("http")) {
    return {
      desktopImportPath: undefined,
      mobileImportPath: undefined,
      desktopExpression: JSON.stringify(imagePath),
      mobileExpression: undefined,
    };
  }

  const sourcePath = post.metadata.source.replace(/^@site\//, "");
  const imagePosixPath = path.posix.normalize(
    path.posix.join(path.posix.dirname(sourcePath), imagePath),
  );
  const mobilePosixPath = imagePosixPath.replace(
    /\.(avif|jpe?g|png|webp)$/i,
    "-mobile.webp",
  );

  return {
    desktopImportPath: `@site/${imagePosixPath}`,
    mobileImportPath: fs.existsSync(path.join(process.cwd(), mobilePosixPath))
      ? `@site/${mobilePosixPath}`
      : undefined,
    desktopExpression: undefined,
    mobileExpression: undefined,
  };
}

function createLatestPostsModule(posts: BlogPost[]) {
  const imports: string[] = [
    'import type { PostItem } from "@site/src/features/home/components/LatestPostsSection/latestPostsSection.types";',
  ];

  const postEntries = posts.map((post, index) => {
    const image = resolveImageImport(post, post.metadata.frontMatter.image);
    const desktopExpression =
      image.desktopExpression ?? `post${index}DesktopImage`;
    const mobileExpression =
      image.mobileExpression ??
      (image.mobileImportPath ? `post${index}MobileImage` : undefined);

    if (image.desktopImportPath) {
      imports.push(
        `import post${index}DesktopImage from ${JSON.stringify(
          image.desktopImportPath,
        )};`,
      );
    }

    if (image.mobileImportPath) {
      imports.push(
        `import post${index}MobileImage from ${JSON.stringify(
          image.mobileImportPath,
        )};`,
      );
    }

    return `  {
    title: ${JSON.stringify(post.metadata.title)},
    permalink: ${JSON.stringify(post.metadata.permalink)},
    dateLabel: ${JSON.stringify(
      latestPostDateFormatter.format(post.metadata.date),
    )},
    description: ${JSON.stringify(post.metadata.description)},
    image: {
      desktopSrc: ${desktopExpression},${
        mobileExpression ? `\n      mobileSrc: ${mobileExpression},` : ""
      }
      alt: ${JSON.stringify(post.metadata.title)},
    },
    imageWidth: 900,
    imageHeight: 600,
  }`;
  });

  return `${imports.join("\n")}

const latestPosts = [
${postEntries.join(",\n")}
] satisfies PostItem[];

export default latestPosts;
`;
}

const latestPostsPlugin = (): Plugin => ({
  name: "code-and-pasta-latest-posts",
  async allContentLoaded({ allContent, actions }) {
    const blogContent = getBlogContent(allContent);
    const latestPosts =
      blogContent?.blogPosts
        .filter(
          (post) =>
            !post.metadata.unlisted && !post.metadata.frontMatter.draft,
        )
        .sort(
          (a, b) =>
            b.metadata.date.getTime() - a.metadata.date.getTime(),
        )
        .slice(0, 2) ?? [];

    await actions.createData(
      "latest-posts.ts",
      createLatestPostsModule(latestPosts),
    );
  },
});

export default latestPostsPlugin;

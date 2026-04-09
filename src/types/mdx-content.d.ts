declare module "*.md" {
  export const metadata: {
    title: string;
    permalink: string;
    date: string;
    description?: string;
    unlisted?: boolean;
  };

  export const frontMatter: {
    draft?: boolean;
    image?: string;
  };

  export const assets: {
    image?: string;
  };
}

declare module "*.mdx" {
  export const metadata: {
    title: string;
    permalink: string;
    date: string;
    description?: string;
    unlisted?: boolean;
  };

  export const frontMatter: {
    draft?: boolean;
    image?: string;
  };

  export const assets: {
    image?: string;
  };
}

interface WebpackRequireContext {
  keys(): string[];
  <T>(id: string): T;
  resolve(id: string): string;
  id: string;
}

declare namespace NodeJS {
  interface Require {
    context(
      path: string,
      deep?: boolean,
      filter?: RegExp,
      mode?: "sync" | "eager" | "weak" | "lazy" | "lazy-once"
    ): WebpackRequireContext;
  }
}

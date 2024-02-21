import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName

const PRISMIC_ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN

/**
 * The project's Prismic Route Resolvers. This list determines a Prismic document's URL.
 */
const routes: prismic.ClientConfig["routes"] = [
  {
    type: "news_archive",
    path: "/news"
  },
  {
    type: "news",
    path: "/news/:uid"
  },
  {
    type: "books_archive",
    path: "/books"
  },
  {
    type: "books",
    path: "/books/:uid"
  },
  {
    type: "research_archive",
    path: "/research"
  },
  {
    type: "research",
    path: "/research/:uid"
  },
  {
    type: "page",
    uid: "home",
    path: "/",
  },
  {
    type: "page",
    path: "/:uid",
  }
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
        accessToken: PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};

import { Api } from "sst/node/api";
import { expect, it } from "vitest";
import { createClient } from "@@@app/graphql/genql";
import { Article } from "@@@app/core/src/article";

it("create an article", async () => {
  const client = createClient({
    url: Api.api.url + "/graphql",
  });

  const article = await client.mutation({
    createArticle: {
      __args: {
        title: "Hello world",
        url: "https://example.com",
      },
      id: true,
    },
  });
  const list = await Article.list();
  expect(
    list.find((a) => a.articleID === article.createArticle.id)
  ).not.toBeNull();
});

// --- MUST be first: mock api-client so import.meta code is never evaluated ---
jest.mock("../../services/api-client", () => {
  return {
    __esModule: true,
    default: {
      get: jest.fn(() => Promise.resolve({ data: [] })),
      post: jest.fn(() => Promise.resolve({ data: {} })),
    },
  };
});
// -------------------------------------------------------------------------

import * as useArticleModule from "../../hooks/useArticle";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LatestNews from "../../components/home/HomeLatestNews"; // ret hvis din komponent hedder noget andet
import { Article } from "../../utils/articles";

// NOTE: ingen mock for ArticleCard her — vi bruger den rigtige komponent.
// Hvis du insisterer på at mocke ArticleCard, brug en simpel mock der IKKE kalder React.createElement.

const mockUseArticle = (articles: Partial<Article>[]) => {
  const data = articles.map((a, i) => ({
    id: i + 1,
    title: a.title ?? `t${i + 1}`,
    date: a.date ?? null,
    image: a.image ?? null,
    article: a.article ?? null,
  })) as Article[];

  type UseArticleReturn = ReturnType<typeof useArticleModule.default>;
  const value = { data } as UseArticleReturn;
  jest.spyOn(useArticleModule, "default").mockReturnValue(value);
};

afterEach(() => {
  jest.restoreAllMocks();
});

test("LatestNews renders 5 newest articles in order", () => {
  const items: Partial<Article>[] = [
    { title: "a", date: 1000 },
    { title: "b", date: 7000 },
    { title: "c", date: null },
    { title: "d", date: 3000 },
    { title: "e", date: 9000 },
    { title: "f", date: 2000 },
    { title: "g", date: 8000 },
  ];

  mockUseArticle(items);

  render(
    <MemoryRouter>
      <LatestNews />
    </MemoryRouter>
  );

  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(5);
  // hent titlerne inde i hvert link ved hjælp af className fra din komponent
  const texts = links.map(link =>
    link.querySelector(".article_card_info")?.textContent?.trim() ?? ""
  );

  expect(texts).toEqual(["e", "g", "b", "d", "f"]);
});

// src/utils/articles.ts
export type Article = {
  id: number;
  title: string;
  article?: string | null;
  date?: number | string | null; // timestamp (number) eller date-string eller null
  image?: string | null;
};

export function getLatest<T extends Article>(articles: T[], count = 5): T[] {
  return [...articles]
    .sort((a, b) => {
      const aDate = normalizeDate(a.date);
      const bDate = normalizeDate(b.date);

      // Hvis begge null/undefined => bevare rækkefølge (0)
      if (aDate === null && bDate === null) return 0;
      if (aDate === null) return 1; // a sidst
      if (bDate === null) return -1; // b sidst

      // begge tal => nyeste først
      return bDate - aDate;
    })
    .slice(0, count);
}

function normalizeDate(d?: number | string | null): number | null {
  if (d == null) return null;
  if (typeof d === "number") return d;
  const t = new Date(d).getTime();
  return Number.isFinite(t) ? t : null;
}

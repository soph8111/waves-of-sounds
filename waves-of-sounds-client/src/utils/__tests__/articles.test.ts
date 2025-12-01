// src/__tests__/articles.test.ts
import { getLatest, Article } from "../articles";

describe("getLatest", () => {
  const make = (arr: Partial<Article>[]) =>
    arr.map((a, i) => ({ id: i + 1, title: `t${i + 1}`, ...a } as Article));

  test("returns empty for empty input", () => {
    expect(getLatest([], 5)).toEqual([]);
  });

  test("sorts timestamps correctly (newest first)", () => {
    const items = make([{ date: 1000 }, { date: 3000 }, { date: 2000 }]);
    const latest = getLatest(items, 3).map((a) => a.date);
    expect(latest).toEqual([3000, 2000, 1000]);
  });

  test("handles date strings and timestamps mixed, null last", () => {
    const items = make([
      { date: "1970-01-01T00:00:04.000Z" }, // 4000
      { date: 3000 },
      { date: "1970-01-01T00:00:02.000Z" }, // 2000
      { date: null },
    ]);
    const latest = getLatest(items, 4);
    expect(latest[0].date).toEqual("1970-01-01T00:00:04.000Z");
    expect(latest[1].date).toEqual(3000);
    expect(latest[2].date).toEqual("1970-01-01T00:00:02.000Z");
    expect(latest[3].date).toBeNull();
  });

  test("places null/undefined dates last", () => {
    const items = make([{ date: null }, { date: undefined }, { date: 5000 }]);
    const latest = getLatest(items, 3);
    expect(latest[0].date).toEqual(5000);
    expect(latest.slice(1).every((a) => a.date == null)).toBe(true);
  });

  test("handles invalid date strings as null", () => {
    const items = make([{ date: "not-a-date" }, { date: 1234 }]);
    const latest = getLatest(items, 2);
    expect(latest[0].date).toBe(1234);
    // invalid date should be treated like null and go last
    expect(latest[1].date === "not-a-date" || latest[1].date === null).toBeTruthy();
  });
});

import { describe, it, expect } from "vitest";
import { BUSINESS_CATEGORIES, GAM_CANTONS } from "./data";

describe("data", () => {
  it("tiene 20 categorías con value único", () => {
    expect(BUSINESS_CATEGORIES).toHaveLength(20);
    expect(new Set(BUSINESS_CATEGORIES.map((c) => c.value)).size).toBe(20);
  });
  it("tiene 30 cantones GAM únicos", () => {
    expect(GAM_CANTONS).toHaveLength(30);
    expect(new Set(GAM_CANTONS).size).toBe(30);
  });
});

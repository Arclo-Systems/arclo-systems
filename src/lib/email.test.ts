import { describe, it, expect } from "vitest";
import { escapeHtml } from "./email";

describe("escapeHtml", () => {
  it("escapa caracteres peligrosos", () => {
    expect(escapeHtml(`<b>"a"&'b'</b>`)).toBe(
      "&lt;b&gt;&quot;a&quot;&amp;&#39;b&#39;&lt;/b&gt;",
    );
  });
  it("deja texto plano intacto", () => {
    expect(escapeHtml("Soda La Esquina")).toBe("Soda La Esquina");
  });
});

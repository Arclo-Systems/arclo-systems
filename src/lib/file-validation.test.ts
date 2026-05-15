import { describe, it, expect } from "vitest";
import { validateUpload } from "./file-validation";
import { MAX_LOGO_BYTES } from "@/app/[locale]/(kodi)/partners/registro/data";

function fakeFile(name: string, type: string, size: number): File {
  const blob = new Blob([new Uint8Array(1)], { type });
  Object.defineProperty(blob, "size", { value: size });
  return new File([blob], name, { type });
}

describe("validateUpload", () => {
  it("acepta PNG de logo dentro de tamaño", () => {
    const r = validateUpload(fakeFile("logo.png", "image/png", 1000), { accept: ["image/png", "image/svg+xml"], maxBytes: MAX_LOGO_BYTES, required: true });
    expect(r.ok).toBe(true);
  });
  it("rechaza tipo no permitido", () => {
    const r = validateUpload(fakeFile("logo.gif", "image/gif", 1000), { accept: ["image/png", "image/svg+xml"], maxBytes: MAX_LOGO_BYTES, required: true });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe("invalid_type");
  });
  it("rechaza archivo demasiado grande", () => {
    const r = validateUpload(fakeFile("logo.png", "image/png", MAX_LOGO_BYTES + 1), { accept: ["image/png", "image/svg+xml"], maxBytes: MAX_LOGO_BYTES, required: true });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe("too_large");
  });
  it("rechaza ausencia cuando es requerido", () => {
    const r = validateUpload(null, { accept: ["image/png"], maxBytes: MAX_LOGO_BYTES, required: true });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toBe("required");
  });
  it("acepta ausencia cuando es opcional", () => {
    const r = validateUpload(null, { accept: ["image/png"], maxBytes: MAX_LOGO_BYTES, required: false });
    expect(r.ok).toBe(true);
  });
});

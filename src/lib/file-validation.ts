export type UploadRule = {
  accept: string[];
  maxBytes: number;
  required: boolean;
};

export type UploadResult =
  | { ok: true }
  | { ok: false; error: "required" | "invalid_type" | "too_large" };

export function validateUpload(
  file: File | null | undefined,
  rule: UploadRule,
): UploadResult {
  if (!file || file.size === 0) {
    return rule.required ? { ok: false, error: "required" } : { ok: true };
  }
  if (!rule.accept.includes(file.type)) {
    return { ok: false, error: "invalid_type" };
  }
  if (file.size > rule.maxBytes) {
    return { ok: false, error: "too_large" };
  }
  return { ok: true };
}

// Solo cliente: verifica dimensiones mínimas de un PNG. SVG se acepta como vector.
export function getImageMinPxOk(file: File, minPx: number): Promise<boolean> {
  if (file.type === "image/svg+xml") return Promise.resolve(true);
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img.naturalWidth >= minPx && img.naturalHeight >= minPx);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(false);
    };
    img.src = url;
  });
}

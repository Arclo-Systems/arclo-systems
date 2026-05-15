"use client";

import { useId } from "react";

export function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: (ids: { id: string; describedBy?: string }) => React.ReactNode;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[var(--kodi-ink)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--kodi-coral)]">*</span>}
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-[var(--kodi-ink-soft)]">
          {hint}
        </p>
      )}
      {children({ id, describedBy })}
      {error && (
        <p id={errId} role="alert" className="text-xs text-[var(--kodi-coral)]">
          {error}
        </p>
      )}
    </div>
  );
}

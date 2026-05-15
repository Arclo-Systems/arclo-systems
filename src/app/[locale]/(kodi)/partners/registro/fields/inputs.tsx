"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-lg border border-[var(--kodi-border)] bg-[var(--kodi-surface-2)] px-3 py-2 text-sm text-[var(--kodi-ink)] outline-none transition-[border-color,box-shadow] duration-150 focus-visible:border-[var(--kodi-teal)] focus-visible:ring-2 focus-visible:ring-[var(--kodi-ring)]/40 disabled:opacity-50";

export const TextInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(function TextInput({ className, ...props }, ref) {
  return <input ref={ref} className={cn(base, className)} {...props} />;
});

export const DateInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(function DateInput({ className, ...props }, ref) {
  return <input ref={ref} type="date" className={cn(base, className)} {...props} />;
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(function Select({ className, ...props }, ref) {
  return <select ref={ref} className={cn(base, className)} {...props} />;
});

export const AffixInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { prefix: string }
>(function AffixInput({ prefix, className, ...props }, ref) {
  return (
    <div
      className={cn(
        "flex w-full items-center rounded-lg border border-[var(--kodi-border)] bg-[var(--kodi-surface-2)] text-sm text-[var(--kodi-ink)] transition-[border-color,box-shadow] duration-150 focus-within:border-[var(--kodi-teal)] focus-within:ring-2 focus-within:ring-[var(--kodi-ring)]/40",
        className,
      )}
    >
      <span
        aria-hidden
        className="select-none py-2 pl-3 pr-1 text-[var(--kodi-ink-soft)]"
      >
        {prefix}
      </span>
      <input
        ref={ref}
        className="min-w-0 flex-1 rounded-r-lg bg-transparent py-2 pr-3 outline-none disabled:opacity-50"
        {...props}
      />
    </div>
  );
});

export function TextareaCounter({
  value,
  max,
  className,
  ...props
}: React.ComponentProps<"textarea"> & { value: string; max: number }) {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        className={cn(base, "min-h-24 resize-y", className)}
        maxLength={max}
        value={value}
        {...props}
      />
      <span aria-live="polite" className="self-end text-xs text-[var(--kodi-ink-soft)]">
        {value.length}/{max}
      </span>
    </div>
  );
}

export function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="text-sm font-medium text-[var(--kodi-ink)]">
        {legend}
      </legend>
      <div className="flex gap-4">
        {options.map((o) => (
          <label key={o.value} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="accent-[var(--kodi-teal)]"
            />
            {o.label}
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="text-xs text-[var(--kodi-coral)]">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function CheckboxGroup({
  legend,
  options,
  selected,
  onToggle,
  allLabel,
  onToggleAll,
  error,
}: {
  legend: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  allLabel: string;
  onToggleAll: (checked: boolean) => void;
  error?: string;
}) {
  const allChecked = options.length > 0 && selected.length === options.length;
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="text-sm font-medium text-[var(--kodi-ink)]">
        {legend}
      </legend>
      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={allChecked}
          onChange={(e) => onToggleAll(e.target.checked)}
          className="accent-[var(--kodi-teal)]"
        />
        {allLabel}
      </label>
      <div className="flex flex-col gap-1 pl-1">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(o)}
              onChange={() => onToggle(o)}
              className="accent-[var(--kodi-teal)]"
            />
            {o}
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className="text-xs text-[var(--kodi-coral)]">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function FileInput({
  accept,
  onChange,
  fileName,
  buttonLabel,
  ...props
}: Omit<React.ComponentProps<"input">, "type" | "onChange"> & {
  accept: string;
  onChange: (file: File | null) => void;
  fileName?: string;
  buttonLabel: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <label className="cursor-pointer rounded-lg border border-[var(--kodi-border)] bg-[var(--kodi-surface-2)] px-3 py-2 text-sm transition-transform duration-150 active:scale-[0.97]">
        <input
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          {...props}
        />
        {fileName ?? buttonLabel}
      </label>
    </div>
  );
}

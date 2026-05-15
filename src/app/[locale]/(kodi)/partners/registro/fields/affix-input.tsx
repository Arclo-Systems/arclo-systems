"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input con un prefijo fijo no editable (ej. "@" o "https://").
 * Pensado para usarse dentro de <FormControl> de shadcn: los props que
 * inyecta el Slot (id, aria-describedby, aria-invalid) y los del field de
 * RHF (value, onChange, onBlur, name) se reenvían al <input> interno; el
 * <div> es solo el contenedor visual con el look de shadcn Input.
 */
export const AffixInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { prefix: string }
>(function AffixInput({ prefix, className, ...props }, ref) {
  return (
    <div
      className={cn(
        "flex h-9 w-full items-center rounded-md border border-input bg-transparent shadow-xs transition-[color,box-shadow]",
        "focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
        "has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]]:ring-destructive/20",
        className,
      )}
    >
      <span
        aria-hidden
        className="select-none pl-3 pr-1 text-sm text-muted-foreground"
      >
        {prefix}
      </span>
      <input
        ref={ref}
        className="h-full w-full min-w-0 rounded-r-md bg-transparent pr-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        {...props}
      />
    </div>
  );
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kódi Partners",
  description: "Registro de partners de Kódi",
};

export default function PartnersRegistroPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12 lg:px-8">
      <h1 className="font-dongle text-5xl font-bold">Kódi Partners</h1>
    </div>
  );
}

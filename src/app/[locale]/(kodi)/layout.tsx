import { poppins } from "./fonts";
import "./kodi.css";
import { KodiHeader } from "@/components/kodi/kodi-header";
import { KodiBackdrop } from "@/components/kodi/kodi-backdrop";
import { KodiFooter } from "@/components/kodi/kodi-footer";

export default function KodiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`kodi-scope kodi-theme flex flex-col ${poppins.variable}`}>
      <KodiBackdrop />
      <KodiHeader />
      <main className="flex-1">{children}</main>
      <KodiFooter />
    </div>
  );
}

import Image from "next/image";

export function KodiBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, oklch(0.62 0.075 205 / 0.06), transparent), radial-gradient(50% 40% at 10% 100%, oklch(0.79 0.13 85 / 0.05), transparent)",
        }}
      />
      <Image
        src="/assets/kodi/profe_marta.svg"
        alt=""
        width={520}
        height={520}
        className="absolute -right-24 top-24 w-[420px] opacity-[0.06] grayscale sm:w-[520px]"
      />
      <Image
        src="/assets/kodi/Llama.svg"
        alt=""
        width={480}
        height={480}
        className="absolute -left-28 bottom-[-60px] w-[380px] opacity-[0.05] grayscale sm:w-[480px]"
      />
      <Image
        src="/assets/kodi/kolones.svg"
        alt=""
        width={120}
        height={120}
        className="absolute left-[12%] top-[18%] w-20 opacity-[0.05]"
      />
    </div>
  );
}

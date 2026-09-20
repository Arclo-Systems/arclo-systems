import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "arclo - Custom software for your business",
    short_name: "arclo",
    description:
      "Automation, integrations and AI agents. Custom software, web and mobile apps.",
    start_url: "/",
    display: "browser",
    background_color: "#0B111D",
    theme_color: "#0B111D",
    // Solo íconos que existen en public/: icon-192.png e icon-512.png están pendientes de generar.
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

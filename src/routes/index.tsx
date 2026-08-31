import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/experience/Experience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "For Shanaya" },
      {
        name: "description",
        content:
          "A quiet, cinematic night sky — something made slowly, by hand, for Shanaya.",
      },
      { property: "og:title", content: "For Shanaya" },
      {
        property: "og:description",
        content: "There's something I wanted you to see.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "theme-color", content: "#06070f" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Experience />;
}

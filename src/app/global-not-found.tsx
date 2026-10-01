import type { Metadata } from "next";
import NotFound from "next/dist/client/components/builtin/not-found";
import SiteLayout, { generateMetadata as siteMetadata } from "./(site)/layout";

// The site and the /keystatic editor have separate root layouts, so 404s have no
// single layout to render in. This shows Next's standard 404 inside the site layout.
export async function generateMetadata(): Promise<Metadata> {
  return { ...(await siteMetadata()), title: "404: This page could not be found." };
}

export default function GlobalNotFound() {
  return (
    <SiteLayout params={Promise.resolve({})}>
      <NotFound />
    </SiteLayout>
  );
}

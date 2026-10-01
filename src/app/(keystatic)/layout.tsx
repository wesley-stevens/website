import { notFound } from "next/navigation";
import KeystaticApp from "./keystatic/keystatic";

export const metadata = { title: "Keystatic" };

// Root layout for the content editor at /keystatic. Kept separate from the site's
// layout in (site)/ so the editor gets none of the site's navbar, footer, or styles.
// The editor renders here (not in the page), so this check is what keeps it dev-only.
export default function KeystaticLayout() {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}

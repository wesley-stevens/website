import { notFound } from "next/navigation";

// The editor UI is rendered by the (keystatic) layout; this page just claims the routes.
// Local storage mode only works on your machine, so the editor 404s outside `npm run dev`.
export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return null;
}

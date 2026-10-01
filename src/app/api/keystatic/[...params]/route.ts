import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

const handler = makeRouteHandler({ config });

// The editor API only runs in `npm run dev`; everywhere else it's a 404.
const devOnly =
  (route: (req: Request) => Promise<Response>) =>
  (req: Request): Promise<Response> =>
    process.env.NODE_ENV !== "development"
      ? Promise.resolve(new Response("Not Found", { status: 404 }))
      : route(req);

export const GET = devOnly(handler.GET);
export const POST = devOnly(handler.POST);

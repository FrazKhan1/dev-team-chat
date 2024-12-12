/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  try {
    const isAuthenticated = await convexAuth.isAuthenticated();

    if (!isSignInPage(request) && !isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/auth");
    }

    if (isSignInPage(request) && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/");
    }
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

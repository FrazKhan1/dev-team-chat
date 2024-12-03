import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublic = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  try {
    console.log("Request path:", request.url);

    const isAuthenticated = await convexAuth.isAuthenticated();
    console.log("Is Authenticated:", isAuthenticated);

    if (!isPublic(request) && !isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/auth");
    }

    if (isPublic(request) && isAuthenticated) {
      return nextjsMiddlewareRedirect(request, "/");
    }
  } catch (error) {
    console.error("Middleware error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

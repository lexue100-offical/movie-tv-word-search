var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// src/pages/_app.tsx
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import superjson from "superjson";
import "../styles/globals.css";
var MyApp = function (_a) {
    var Component = _a.Component, _b = _a.pageProps, session = _b.session, pageProps = __rest(_b, ["session"]);
    return (<SessionProvider session={session}>
      <Component {...pageProps}/>
    </SessionProvider>);
};
var getBaseUrl = function () {
    var _a;
    if (typeof window !== "undefined")
        return ""; // browser should use relative url
    if (process.env.VERCEL_URL)
        return "https://".concat(process.env.VERCEL_URL); // SSR should use vercel url
    return "http://localhost:".concat((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000); // dev SSR should use localhost
};
export default withTRPC({
    config: function () {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/ssr
         */
        var url = "".concat(getBaseUrl(), "/api/trpc");
        return {
            links: [
                loggerLink({
                    enabled: function (opts) {
                        return process.env.NODE_ENV === "development" ||
                            (opts.direction === "down" && opts.result instanceof Error);
                    },
                }),
                httpBatchLink({ url: url }),
            ],
            url: url,
            transformer: superjson,
            /**
             * @link https://react-query.tanstack.com/reference/QueryClient
             */
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
            // To use SSR properly you need to forward the client's headers to the server
            // headers: () => {
            //   if (ctx?.req) {
            //     const headers = ctx?.req?.headers;
            //     delete headers?.connection;
            //     return {
            //       ...headers,
            //       "x-ssr": "1",
            //     };
            //   }
            //   return {};
            // }
        };
    },
    /**
     * @link https://trpc.io/docs/ssr
     */
    ssr: false,
})(MyApp);

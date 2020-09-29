import { useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import * as gtag from "../lib/gtag";

import hhmTheme from "../styles/theme";
import "../styles/core.scss";

export default ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <ThemeProvider theme={hhmTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

import { AppProps } from "next/app";

import "@/assets/blklight.scss";
import "katex/dist/katex.css";

import Head from "next/head";
import Layout from "@/layouts/Layout";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

import Barlow from "@/components/Fonts/Barlow";
import JetBrains from "@/components/Fonts/JetBrainsMono";
import IBMPlexSerif from "@/components/Fonts/IBMPlexSerif";

import { library, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCheckSquare, faCoffee, faSun, faMoon);

// import { ClientReload } from "@/components/ClientReload";
// const isDevelopment = process.env.NODE_ENV === "development";
// const isSocket = process.env.SOCKET;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${Barlow.style.fontFamily};
          --font-serif: ${IBMPlexSerif.style.fontFamily};
          --font-mono: ${JetBrains.style.fontFamily}
				}
			}`}</style>
      <ThemeProvider enableSystem={true} attribute="class">
        {/* {isDevelopment && isSocket && <ClientReload />} */}
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ThemeProvider>
    </>
  );
};
export default App;

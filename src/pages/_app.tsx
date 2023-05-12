import "@/styles/globals.css";
import Navbar from "components/Navbar";
import type { AppProps } from "next/app";
import { AuthProvider } from "../../contexts/authContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}

import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";

globalStyles();
import logoImg from "../assets/Logo.svg";
import { Container, Header } from "../styles/pages/app";
import Image from "next/image";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="Ignite Shop" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}

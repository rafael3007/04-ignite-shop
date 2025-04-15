import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";

import { SuccessProps } from "../types/success";

import { stripe } from "../lib/stripe";

import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import Head from "next/head";

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={120}
            height={110}
            alt="produto comprado"
          />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{" "}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href={"/"} prefetch={false}>
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const customerName = session.customer_details?.name || "Cliente";
  const product = session.line_items?.data[0]?.price?.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};

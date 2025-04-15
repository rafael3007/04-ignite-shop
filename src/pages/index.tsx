import { GetStaticProps } from "next";
import { useKeenSlider } from "keen-slider/react"
import Stripe from "stripe";

import { stripe } from "../lib/stripe";

import Product from "../components/product";
import { HomeContainer } from "../styles/pages/home";

import { HomeProps } from "../types/home";

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })
  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Product key={`product-${product.id}`} product={product}  />
        )
      })}
    </HomeContainer>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({expand: ['data.default_price']})

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format((price.unit_amount ?? 0) / 100),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}
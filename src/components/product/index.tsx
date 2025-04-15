import { ProductContainer } from "@/src/styles/pages/home";
import { ProductProps } from "@/src/types/product";
import Image from "next/image";


export default function Product({ product }: ProductProps) {
  return (
    <ProductContainer className="keen-slider__slide">
        <Image src={product.imageUrl} width={520} height={480} alt="produto" />
        <footer>
          <strong>{product.name}</strong>
          <span>{product.price}</span>
        </footer>
      </ProductContainer>
  )
}
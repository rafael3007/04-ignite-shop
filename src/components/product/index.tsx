import Image from "next/image";
import { ProductContainer } from "@/src/styles/pages/components/product";
import { ProductProps } from "@/src/types/product";
import Link from "next/link";

export default function Product({ product }: ProductProps) {
  return (
    <Link href={`/product/${product.id}`} prefetch={false} passHref legacyBehavior>
      <ProductContainer className="keen-slider__slide">
        <Image src={product.imageUrl} width={520} height={480} alt="produto" />
        <footer>
          <strong>{product.name}</strong>
          <span>{product.price}</span>
        </footer>
      </ProductContainer>
    </Link>
  );
}

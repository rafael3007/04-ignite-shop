export interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  description?: string
  defaultPriceId?: string
}

export interface ProductProps {
  product: Product
}
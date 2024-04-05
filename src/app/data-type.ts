export interface SignUp {
  name: string,
  email: string,
  password: string
}
export interface login {
  email: string,
  password: string
}
export interface product {
  name: string,
  price: number,
  category: string,
  color: string,
  description: string,
  image: string,
  id: string,
  productId: undefined | number,
  quantity: undefined | number
}
export interface cart {
  name: string,
  price: number,
  category: string,
  color: string,
  description: string,
  image: string,
  id: string,
  productId: string,
  quantity: undefined | number,
  userId: number
}
export interface priceSummary {
  price: number,
  discount: number,
  tax: number,
  delivery: number,
  total: number
}
export interface orders {
  email: string,
  address: string,
  contact: string,
  totalprice: number,
  userId: string,
  id: string | undefined
}

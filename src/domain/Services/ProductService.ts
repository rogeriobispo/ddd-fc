import Product from "../entity/product"
export default class ProductService {
  static changePrices(products: Product[], percentage: number) {
    products.forEach((product: any) => {
      const newPrice = product.price * (1 + percentage / 100)
      product.changePrice(newPrice)
    })

  }
}
import Product from "../entity/product";
import ProductService from "./ProductService";

describe('ProductService unit test', () => {
  it('should change price of all products', () => {
    const product1 = new Product({ id: 'product1', name: 'description1', price: 10 });
    const product2 = new Product({ id: 'product2', name: 'description2', price: 20 });
    const product3 = new Product({ id: 'product3', name: 'description3', price: 30 });
    const products = [product1, product2, product3];

    ProductService.changePrices(products, 10);

    expect(product1.price).toBe(11);
    expect(product2.price).toBe(22);
    expect(product3.price).toBe(33);

  })
});
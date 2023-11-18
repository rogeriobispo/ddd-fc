import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequilize/model/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe('Product Repository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      sync: { force: true },
      models: [__dirname + '/../../../src/infra/model']
    });
    sequelize.addModels([ProductModel])

    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product({ id: 'Product1', name: 'Description of product 1', price: 10.99 })
    await productRepository.create(product);
    const productModel = await ProductModel.findOne({ where: { id: 'Product1' } });

    expect(productModel.toJSON()).toStrictEqual({ id: 'Product1', name: 'Description of product 1', price: 10.99 })
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product({ id: 'Product1', name: 'Description of product 1', price: 10.99 })
    await productRepository.create(product);
    product.changeName('New description of product 1')
    product.changePrice(11.99)
    await productRepository.update(product);
    const productModelUpdated = await ProductModel.findOne({ where: { id: 'Product1' } });
    expect(productModelUpdated.toJSON()).toStrictEqual({ id: 'Product1', name: 'New description of product 1', price: 11.99 })
  })

  it('should find a product by id', async () => {
    const productRepository = new ProductRepository()
    const product = new Product({ id: 'Product1', name: 'Description of product 1', price: 10.99 })
    await productRepository.create(product);
    const productModel = await productRepository.findById('Product1');
    expect(productModel).toStrictEqual(product)
  })

  it('should find all products', async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product({ id: 'Product1', name: 'Description of product 1', price: 10.99 })
    const product2 = new Product({ id: 'Product2', name: 'Description of product 2', price: 11.99 })
    await productRepository.create(product1);
    await productRepository.create(product2);
    const products = await productRepository.findAll();
    expect(products).toStrictEqual([product1, product2])
  })
});
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequilize/model/customer.model";
import OrderItemModel from "../db/sequilize/model/order_item.model";
import OrderItem from "../../domain/entity/orderItems";
import OrderModel from "../db/sequilize/model/order.model";
import ProductModel from "../db/sequilize/model/product.model";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";
import CustomerRepository from "./customer.repository";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe('OrderRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      sync: { force: true },
      models: [__dirname + '/../../../src/infra/model']
    });
    sequelize.addModels([CustomerModel, OrderItemModel, OrderModel, ProductModel])

    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('Customer1', 'Customer 1', new Address('Street 1', '1', 'City 1', 'SP', '00000-000'))
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product({ id: 'Product1', name: 'Product1', price: 10 });
    await productRepository.create(product);

    const orderItem = new OrderItem('OrderItem1', product.name, product.id, 1, product.price);

    const order = new Order('Order1', customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderCreated = await OrderModel.findOne({ where: { id: order.id }, include: [OrderItemModel] });

    expect(orderCreated.toJSON()).toStrictEqual(
      {
        id: 'Order1',
        customerId: 'Customer1',
        total: order.total(),
        items: [
          {
            id: 'OrderItem1',
            name: 'Product1',
            price: 10,
            productId: 'Product1',
            quantity: 1,
            orderId: 'Order1'
          }
        ]
      }
    );
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('Customer1', 'Customer 1', new Address('Street 1', '1', 'City 1', 'SP', '00000-000'))
    const customer2 = new Customer('Customer2', 'Customer 2', new Address('Street 1', '1', 'City 1', 'SP', '00000-000'))
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product({ id: 'Product3', name: 'Product1', price: 10 });
    await productRepository.create(product);

    const orderItem = new OrderItem('OrderItem1', product.name, product.id, 1, product.price);

    const orderItem2 = new OrderItem('OrderItem2', product.name, product.id, 1, product.price);
    const order = new Order('Order2', customer.id, [orderItem]);
    const order2 = new Order('Order3', customer.id, [orderItem2]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);
    const orders = await orderRepository.findAll();

    expect(orders.length).toBe(2);
    expect(orders[0].id).toBe('Order2');
    expect(orders[1].id).toBe('Order3');
  })

  it('should update order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('Customer1', 'Customer 1', new Address('Street 1', '1', 'City 1', 'SP', '00000-000'))
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product({ id: 'Product1', name: 'Product1', price: 10 });
    await productRepository.create(product);

    const orderItem = new OrderItem('OrderItem1', product.name, product.id, 1, product.price);

    const order = new Order('Order1', customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const newCustomer = new Customer('Customer2', 'Customer 2', new Address('Street 1', '1', 'City 1', 'SP', '00000-000'))
    await customerRepository.create(newCustomer);

    orderRepository.update(new Order('Order1', newCustomer.id, [orderItem])); // update order chamado aqui

    const updatedOrder = await OrderModel.findOne({ where: { id: order.id }, include: [OrderItemModel] });
    expect(updatedOrder.customerId).toBe('Customer2');

  })

  it('should find order by id', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('Customer1', 'Customer 1', new Address('Street 1', '1', 'City 1', 'SP', '00000-000'))
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product({ id: 'Product3', name: 'Product1', price: 10 });
    await productRepository.create(product);

    const orderItem = new OrderItem('OrderItem1', product.name, product.id, 1, product.price);

    const order = new Order('Order2', customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const orderFound = await orderRepository.findById('Order2');

    expect(orderFound.id).toBe('Order2');
  })
})
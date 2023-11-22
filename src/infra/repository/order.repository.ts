
import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/orderItems';
import OrderRepositoryInterface from '../../domain/repository/order-repository-interface';
import OrderModel from '../db/sequilize/model/order.model';
import OrderItemModel from '../db/sequilize/model/order_item.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: order.items.map(item => ({ id: item.id, name: item.name, price: item.price, productId: item.productId, quantity: item.quantity }))
    },
      {
        include: [OrderItemModel]
      })
  }

  async update(entity: Order): Promise<void> {
    const order = this.findById(entity.id);
    if (!order) throw new Error('Order not found');

    OrderModel.update({
      customerId: entity.customerId,
      total: entity.total(),
      items: entity.items.map(item => ({ id: item.id, name: item.name, price: item.price, productId: item.productId, quantity: item.quantity }))
    },
      {
        where: { id: entity.id },
        include: [OrderItemModel]
      });

  }

  async findById(id: string): Promise<Order> {
    const order = await OrderModel.findOne({ where: { id }, include: [OrderItemModel] });
    return new Order(order.id, order.customerId, order.items.map((item) => new OrderItem(
      String(item.id),
      item.name,
      String(item.productId),
      Number(item.quantity),
      Number(item.price)
    )));
  }

  async findAll(): Promise<Order[]> {
    const ordersFound = await OrderModel.findAll({ include: [OrderItemModel] });
    const orderFormated = ordersFound.map(order => new Order(
      order.id,
      order.customerId,
      order.items.map(item => {
        return new OrderItem(
          String(item.id),
          item.name,
          String(item.productId),
          Number(item.quantity),
          Number(item.price)
        )
      })));
    return orderFormated;
  }
}
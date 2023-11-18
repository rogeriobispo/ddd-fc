import Address from "../entity/address";
import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItems";
import OrderService from "./orderService";

describe('OrderService unit test', () => {

  it('should give reward to customer', () => {
    const customer = new Customer('customer1', 'customer1', new Address('street1', '100', 'city1', 'state1', 'zip1'));
    const item1 = new OrderItem('orderItem1', 'description1', '10', 1, 10);
    const item2 = new OrderItem('orderItem2', 'description2', '10', 1, 20);

    const order = OrderService.placeOrder(customer, [item1, item2]);
    expect(customer.rewardPoints).toBe(15);
    expect(order.total()).toBe(30);
  });

  it('Should get total of all oders', () => {
    const order1 = new Order('order1', 'description1', [new OrderItem('orderItem1', 'description1', '10', 1, 10)]);
    const order2 = new Order('order2', 'description2', [new OrderItem('orderItem1', 'description1', '10', 1, 20)]);
    const order3 = new Order('order3', 'description3', [new OrderItem('orderItem1', 'description1', '10', 1, 30)]);
    const orders = [order1, order2, order3];

    const total = OrderService.total(orders);

    expect(total).toBe(60);
  });
});
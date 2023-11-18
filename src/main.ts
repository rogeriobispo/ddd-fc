import Customer from './domain/entity/customer';
import Address from './domain/entity/address';
import OrderItem from './domain/entity/orderItems';
import Order from './domain/entity/order';

let address = new Address('123 Main St', '19', 'Anytown', 'USA', '12345');
let customer = new Customer('1', 'John', address);
console.log(customer.toString());


const item1 = new OrderItem('1', 'Item 1', '1', 1, 10);
const item2 = new OrderItem('2', 'Item 2', '2', 2, 20);
const order = new Order('1', '1', [item1, item2]);
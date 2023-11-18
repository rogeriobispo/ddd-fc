import OrderItem from "./orderItems";
export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate()
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customerId;
  }

  get items() {
    return this._items;
  }

  validate() {
    if (this._id.length === 0) throw new Error('Id is required')
    if (this._customerId.length === 0) throw new Error('CustomerId is required')
    if (this._items.length === 0) throw new Error('Items are required')
  }
  total() {
    return this._items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
export default class OrderItem {
  private _id: string;
  private _name: string;
  private _productId: string;
  private _quantity: number;
  private _price: number;

  constructor(id: string, name: string, productId: string, quantity: number, price: number) {
    this._id = id;
    this._name = name;
    this._productId = productId;
    this._quantity = quantity;
    this._price = price;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get productId(): string {
    return this._productId;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }
}
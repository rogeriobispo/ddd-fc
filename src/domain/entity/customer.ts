import Address from "./address";
export default class Customer {
  private _id: string;
  private _name: string;
  private _address: Address;
  private _active: boolean
  private _rewardPoints: number = 0

  constructor(id: string, name: string, address: Address) {
    this._id = id;
    this._name = name;
    this._address = address
    this._active = false
    this.validate()
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get address() {
    return this._address
  }
  changeName(name: string) {
    this._name = name
    this.validate()
  }

  validate() {
    if (this._id.length === 0) throw new Error('Id is required')
    if (this._name.length === 0) throw new Error('Name is required')
  }
  activate() {
    if (this._address === undefined) throw new Error('Address is mandatory to activate a customer')
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  get isActive() {
    return this._active
  }

  get rewardPoints() {
    return this._rewardPoints
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }
  toString() {
    return `Customer: ${this._id}, ${this._name}, ${this._address.toString()}`
  }
}


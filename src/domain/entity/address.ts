export default class Address {

  _street: string;
  _number: string;
  _city: string;
  _state: string;
  _zipCode: string;

  constructor(street: string, number: string, city: string, state: string, zipCode: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
    this.validate()
  }

  get street() {
    return this._street
  }

  get number() {
    return this._number
  }

  get zipcode() {
    return this._zipCode
  }

  get city() {
    return this._city
  }

  validate() {
    if (this._street.length === 0) throw new Error('Street is required')
    if (this._city.length === 0) throw new Error('City is required')
    if (this._state.length === 0) throw new Error('State is required')
    if (this._zipCode.length === 0) throw new Error('ZipCode is required')
  }

  toString(): string {
    return `${this._street}, ${this._number}, ${this._city}, ${this._state}, ${this._zipCode}`
  }
}
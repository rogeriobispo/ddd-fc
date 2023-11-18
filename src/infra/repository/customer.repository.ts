
import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import CustomerRepositoryInterface from '../../domain/repository/customer-repository-interface';
import CustomerModel from '../db/sequilize/model/customer.model';
export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipcode,
      city: entity.address.city,
      active: entity.isActive,
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipcode,
      city: entity.address.city,
      active: entity.isActive,
      rewardPoints: entity.rewardPoints,
    }, {
      where: {
        id: entity.id
      }
    });
  }
  async findById(id: string): Promise<Customer> {
    const customer = await CustomerModel.findOne({ where: { id: id } });
    return new Customer(customer.id, customer.name, new Address(customer.street, customer.number.toString(), customer.city, 'SP', customer.zipcode))
  }
  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();
    return customers.map(customer => new Customer(customer.id, customer.name, new Address(customer.street, customer.number.toString(), customer.city, 'SP', customer.zipcode)))
  }

}
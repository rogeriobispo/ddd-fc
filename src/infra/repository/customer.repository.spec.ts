import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequilize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
describe('CustomerRepository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      sync: { force: true },
      models: [__dirname + '/../../../src/infra/model']
    });
    sequelize.addModels([CustomerModel])

    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('Customer1', 'Customer 1', new Address('Street 1', '1', 'City 1', 'SP', '00000-000'))
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: 'Customer1' } });
    expect(customerModel.toJSON()).toStrictEqual({ id: 'Customer1', name: 'Customer 1', street: 'Street 1', number: 1, zipcode: '00000-000', city: 'City 1', active: false, rewardPoints: 0 })
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('Customer1', 'Customer 1', new Address('Street 1', '1', 'City 1', 'SP', '00000-000'))
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: 'Customer1' } });
    expect(customerModel.toJSON()).toStrictEqual({ id: 'Customer1', name: 'Customer 1', street: 'Street 1', number: 1, zipcode: '00000-000', city: 'City 1', active: false, rewardPoints: 0 })

    customer.changeName('Customer 1 Updated')
    await customerRepository.update(customer);

    const customerModelUpdated = await CustomerModel.findOne({ where: { id: 'Customer1' } });
    expect(customerModelUpdated.toJSON()).toStrictEqual({ id: 'Customer1', name: 'Customer 1 Updated', street: 'Street 1', number: 1, zipcode: '00000-000', city: 'City 1', active: false, rewardPoints: 0 })
  })

  it('should find a customer by id', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('Customer1', 'Customer 1', new Address('Street 1', '1', 'City 1', 'SP', '00000-000'))
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: 'Customer1' } });
    expect(customerModel.toJSON()).toStrictEqual({ id: 'Customer1', name: 'Customer 1', street: 'Street 1', number: 1, zipcode: '00000-000', city: 'City 1', active: false, rewardPoints: 0 })

    const customerFound = await customerRepository.findById('Customer1');
    expect(customerFound).toStrictEqual(customer)
  })

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository()
    const customer1 = new Customer('Customer1', 'Customer 1', new Address('Street 1', '1', 'City 1', 'SP', '00000-000'))
    const customer2 = new Customer('Customer2', 'Customer 2', new Address('Street 2', '2', 'City 2', 'SP', '00000-000'))
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();
    expect(customers).toStrictEqual([customer1, customer2])
  })
});
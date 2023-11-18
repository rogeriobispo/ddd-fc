import Address from "./address";
import Customer from "./customer";

describe('Customer unit tests', () => {

  describe('error if id is empty', () => {
    it('should throw an error', () => {
      expect(() => {
        new Customer(
          '',
          'name',
          new Address('123 Main St', '19', 'Anytown', 'USA', '12345')
        )
      }).toThrow('Id is required')
    })
  })

  describe('error if name is empty', () => {
    it('should throw an error', () => {
      expect(() => {
        new Customer(
          '1',
          '',
          new Address('123 Main St', '19', 'Anytown', 'USA', '12345')
        )
      }).toThrow('Name is required')
    })
  })

  describe('Activate error if address is empty', () => {
    it('should throw an error', () => {
      expect(() => {
        const customer = new Customer(
          '1',
          'name',
          undefined
        )
        customer.activate()
      }).toThrow('Address is mandatory to activate a customer')
    })
  })
  describe('activate customer', () => {
    it('should activate customer', () => {
      const customer = new Customer(
        '1',
        'name',
        new Address('123 Main St', '19', 'Anytown', 'USA', '12345')
      )
      customer.activate()
      expect(customer.isActive).toBe(true)
    })
  })

  describe('deactivate customer', () => {
    it('should deactivate customer', () => {
      const customer = new Customer(
        '1',
        'name',
        new Address('123 Main St', '19', 'Anytown', 'USA', '12345')
      )
      customer.deactivate()
      expect(customer.isActive).toBe(false)
    })
  })

  describe('toString', () => {
    it('should return a string', () => {
      const customer = new Customer(
        '1',
        'name',
        new Address('123 Main St', '19', 'Anytown', 'USA', '12345')
      )
      expect(customer.toString()).toBe('Customer: 1, name, 123 Main St, 19, Anytown, USA, 12345')
    })
  })

  describe('change name', () => {
    it('should change name', () => {
      const customer = new Customer(
        '1',
        'name',
        new Address('123 Main St', '19', 'Anytown', 'USA', '12345')
      )
      customer.changeName('new name')
      expect(customer.toString()).toBe('Customer: 1, new name, 123 Main St, 19, Anytown, USA, 12345')
    })
  })

  describe('change name to empty', () => {
    it('should not change name', () => {
      const customer = new Customer(
        '1',
        'name',
        new Address('123 Main St', '19', 'Anytown', 'USA', '12345')
      )

      expect(() => customer.changeName('')).toThrow('Name is required')
    })
  })

  describe('add reward points', () => {
    it('should add reward points', () => {
      const customer = new Customer(
        '1',
        'name',
        new Address('123 Main St', '19', 'Anytown', 'USA', '12345')
      )

      expect(customer.rewardPoints).toBe(0)
      customer.addRewardPoints(10)
      expect(customer.rewardPoints).toBe(10)
      customer.addRewardPoints(10)
      expect(customer.rewardPoints).toBe(20)
    })
  })
});
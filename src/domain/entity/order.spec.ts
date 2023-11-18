import Order from "./order";

describe('Order unit tests', () => {
  it('should create an order', () => {
    // Arrange
    const id = '1';
    const customerId = '1';
    const items = [
      { price: 10 },
      { price: 20 },
      { price: 30 },

    ];
    // Act
    const order = new Order(id, customerId, items);
    // Assert
    expect(order).toBeDefined();
    expect(order._id).toEqual(id);
    expect(order._customerId).toEqual(customerId);
    expect(order._items).toEqual(items);
  });

  it('should throw an error when id is empty', () => {
    // Arrange
    const id = '';
    const customerId = '1';
    const items = [];
    // Act
    // Assert
    expect(() => new Order(id, customerId, items)).toThrowError('Id is required');
  });

  it('should throw an error when customerId is empty', () => {
    // Arrange
    const id = '1';
    const customerId = '';
    const items = [];
    // Act
    // Assert
    expect(() => new Order(id, customerId, items)).toThrowError('CustomerId is required');
  });

  it('should throw an error when items is empty', () => {
    // Arrange
    const id = '1';
    const customerId = '1';
    const items = [];
    // Act
    // Assert
    expect(() => new Order(id, customerId, items)).toThrowError('Items are required');
  })
  describe('should calculate the total of an order', () => {
    it('should calculate total', () => {
      // Arrange
      const id = '1';
      const customerId = '1';
      const items = [
        { price: 10, quantity: 2 }, 
        { price: 20, quantity: 2 }, 
        { price: 30, quantity: 2 },
      ];
      const order = new Order(id, customerId, items);
      // Act
      const total = order.total();
      // Assert
      expect(total).toEqual(120);
    })
  });
})
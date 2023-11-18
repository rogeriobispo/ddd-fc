import Product from "./product"

describe('Product unit tests', () => {
  it('should throw an error if id is not provided', () => {
    expect(() => new Product({ id: '', name: 'Produto 1', price: 100 })).toThrowError('Id is required')
  })

  it('should throw an error if name is not provided', () => {
    expect(() => new Product({ id: '1', name: '', price: 100 })).toThrowError('Name is required')
  })

  it('should throw an error if price is not provided', () => {
    expect(() => new Product({ id: '1', name: 'Produto 1', price: 0 })).toThrowError('Price is required')
  })

  it('should create a product with all properties', () => {
    const product = new Product({ id: '1', name: 'Produto 1', price: 100 })
    expect(product.id).toBe('1')
    expect(product.name).toBe('Produto 1')
    expect(product.price).toBe(100)
  })

  it('should change name', () => {
    const product = new Product({ id: '1', name: 'Produto 1', price: 100 })
    product.changeName('Produto 2')
    expect(product.name).toBe('Produto 2')
  })

  it('should throw an error if name is not provided when changing name', () => {
    const product = new Product({ id: '1', name: 'Produto 1', price: 100 })
    expect(() => product.changeName('')).toThrowError('Name is required')
  })

  it('should throw an error if price is not provided', () => {
    const product = new Product({ id: '1', name: 'Produto 1', price: 100 })
    expect(() => product.changePrice(0)).toThrowError('Price is required')
  })
})
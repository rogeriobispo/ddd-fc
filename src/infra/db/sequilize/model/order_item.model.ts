import { Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import ProductModel from './product.model';
import OrderModel from './order.model';
@Table({
  tableName: 'order_items',
  timestamps: false,
})
export default class OrderItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => ProductModel)
  @Column
  declare productId: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @ForeignKey(() => OrderModel)
  @Column
  declare orderId: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @Column
  declare price: number;

  @Column
  declare quantity: number;

  @Column
  declare name: string;
}
import { Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import CustomerModel from './customer.model';
import OrderItemModel from './order_item.model';
@Table({
  tableName: 'orders',
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @Column
  declare total: number;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];
}
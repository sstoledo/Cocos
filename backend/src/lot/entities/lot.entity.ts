import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Lot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({name: "codeProduct", referencedColumnName: "code"})
  parentProduct: Product;

  @Column({ nullable: false })
  codeProduct: string;

  @Column('int')
  quantity: number;

  @Column('date')
  dateEntry: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  priceBuy: number;

  @Column('decimal', { precision: 10, scale: 2 })
  priceLot: number;

  @ManyToOne(() => Provider, { nullable: false })
  @JoinColumn({ name: 'idProvider', referencedColumnName: 'id' })
  parentProvider: Provider;

  @Column({ nullable: false })
  idProvider: string;

  @Column({ default: true, nullable: true })
  isActive: boolean;
}

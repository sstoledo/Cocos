import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Lot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, { nullable: false, onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'codeProduct', referencedColumnName: 'code' })
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

  @Column({ default: true, nullable: true })
  isActive: boolean;
}

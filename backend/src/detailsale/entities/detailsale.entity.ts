import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sale } from '../../sale/entities/sale.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class DetailSale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Sale, { nullable: false })
  @JoinColumn({ name: 'idSale', referencedColumnName: 'id' })
  idSale: string;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'codeProduct', referencedColumnName: 'code' })
  parent: Product;

  @Column({ nullable: false })
  codeProduct: string;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  priceUnit: number;

  @Column({ default: true, nullable: true })
  isActive: boolean;
}

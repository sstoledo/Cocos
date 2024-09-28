import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Lot } from '../../lot/entities/lot.entity';
import { DetailSale } from '../../detailsale/entities/detailsale.entity';

@Entity()
export class DepartureLot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Lot, { nullable: false })
  @JoinColumn({ name: 'idLot', referencedColumnName: 'id' })
  idLot: string;

  @ManyToOne(() => DetailSale, { nullable: false })
  @JoinColumn({ name: 'idDetailSale', referencedColumnName: 'id' })
  parent: DetailSale;

  @Column({ nullable: false })
  idDetailSale: string;

  @Column('int')
  quantity: number;

  @Column({ default: true, nullable: true })
  isActive: boolean;
}
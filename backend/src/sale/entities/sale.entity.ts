import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Client } from '../../clientes/entities/cliente.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Client, { nullable: false })
  @JoinColumn({ name: 'idClient', referencedColumnName: 'id' })
  parentClient: Client;

  @Column({ nullable: false })
  idClient: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column({ default: true, nullable: true })
  isActive: boolean;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MarcaCars } from '../../marcacars/entities/marcacar.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  apat: string;

  @Column({ length: 50 })
  amat: string;

  @Column({ length: 8, unique: true })
  dni: string;

  @Column({ length: 150, nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 50, unique: true })
  matricula: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  kilometraje: number;

  @ManyToOne(() => MarcaCars, { nullable: false })
  @JoinColumn({ name: 'idMarca', referencedColumnName: 'id' })
  parent: MarcaCars;

  @Column({ nullable: false })
  idMarca: string;

  @Column({ length: 50, nullable: true })
  modelo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true, nullable: true })
  isActive: boolean;
}

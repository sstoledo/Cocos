import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Provider } from '../../provider/entities/provider.entity';
import { Category } from '../../category/entities/category.entity';
import { Presentacion } from '../../presentacion/entities/presentacion.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  code: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Provider, { nullable: false })
  @JoinColumn({ name: 'idProvider', referencedColumnName: 'id' })
  parentProvider: Provider;

  @Column({ nullable: false })
  idProvider: string;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'idCategory', referencedColumnName: 'id' })
  parentCategory: Category;

  @Column({ nullable: false })
  idCategory: string;

  @ManyToOne(() => Presentacion, { nullable: false })
  @JoinColumn({ name: 'idPresentacion', referencedColumnName: 'id' })
  parentPresentacion: Presentacion;

  @Column({ nullable: false })
  idPresentacion: string;

  @Column({ length: 50, nullable: true })
  publicId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true, nullable: true })
  isActive: boolean;
}

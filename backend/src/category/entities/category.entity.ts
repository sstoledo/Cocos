import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  // Relación recursiva: una categoría puede tener una categoría padre
  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'fatherId', referencedColumnName: 'id' })
  parent: Category; // Cambia fatherId a parent para ser más semántico

  @Column({ nullable: true })
  fatherId: string; // Agrega esto para poder acceder a fatherId directamente

  // Relación inversa: una categoría padre puede tener múltiples categorías hijas
  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true, nullable: true })
  isActive: boolean;
}
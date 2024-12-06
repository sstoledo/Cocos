import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  // Relación recursiva: una categoría puede tener una categoría padre
  @ManyToOne(() => Category, category => category.children, { nullable: true, eager: false })
  @JoinColumn({ name: 'fatherId' })
  father: Category | null; // Relación con el padre, no necesitas "fatherId" por separado

  // Relación inversa: una categoría padre puede tener múltiples categorías hijas
  @OneToMany(() => Category, category => category.father)
  children: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true, nullable: true })
  isActive: boolean;
}

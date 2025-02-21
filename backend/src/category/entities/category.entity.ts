import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isRootCategory: boolean;  // Nuevo campo para identificar categorías raíz

  @Column({ type: 'int', default: 0 })
  level: number;  // Nivel de profundidad en la jerarquía

  @ManyToOne(() => Category, category => category.children, { nullable: true })
  father: Category;

  @OneToMany(() => Category, category => category.father)
  children: Category[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
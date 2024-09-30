import { Client } from "src/clientes/entities/cliente.entity";
import { MarcaCars } from "src/marcacars/entities/marcacar.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("automovil")
export class Automovil {

  @PrimaryGeneratedColumn("uuid")
  id:string;

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

  @ManyToOne(() => Client, client => client.automoviles)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column({ nullable: false })
  clientId: string;

}

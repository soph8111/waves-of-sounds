import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Volunteer } from "./Volunteer";

@Entity("department", { schema: "wavesOfSounds" })
export class Department {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("varchar", { name: "department", nullable: true, length: 45 })
  department?: string | null;

  @ManyToMany(() => Volunteer, (volunteer) => volunteer.departments)
  volunteers?: Volunteer[];
}

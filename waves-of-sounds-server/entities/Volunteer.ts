import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Department } from "./Department";

@Entity("volunteer", { schema: "wavesOfSounds" })
export class Volunteer {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name?: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 45 })
  email?: string | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt?: Date | null;

  @ManyToMany(() => Department, (department) => department.volunteers)
  @JoinTable({
    name: "volunteer_has_department",
    joinColumns: [{ name: "volunteer_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "department_id", referencedColumnName: "id" }],
    schema: "wavesOfSounds",
  })
  departments?: Department[];
}

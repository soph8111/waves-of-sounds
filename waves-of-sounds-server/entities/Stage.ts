import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Artist } from "./Artist";
import { Schedule } from "./Schedule";

@Entity("stage", { schema: "wavesOfSounds" })
export class Stage {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name?: string | null;

  @OneToMany(() => Artist, (artist) => artist.stage)
  artists?: Artist[];

  @ManyToMany(() => Schedule, (schedule) => schedule.stages)
  schedules?: Schedule[];
}

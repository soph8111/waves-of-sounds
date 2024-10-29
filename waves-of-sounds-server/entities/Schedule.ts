import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Artist } from "./Artist";
import { Stage } from "./Stage";

@Entity("schedule", { schema: "wavesOfSounds" })
export class Schedule {
  @Column("int", { primary: true, name: "id" })
  id?: number;

  @Column("datetime", { name: "start", nullable: true })
  start?: Date | null;

  @Column("datetime", { name: "end", nullable: true })
  end?: Date | null;

  @OneToMany(() => Artist, (artist) => artist.schedule)
  artists?: Artist[];

  @ManyToMany(() => Stage, (stage) => stage.schedules)
  stages?: Stage[];
}

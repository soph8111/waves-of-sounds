import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Artist } from "./Artist";
import { Stage } from "./Stage";

@Entity("schedule", { schema: "wavesOfSounds" })
export class Schedule {
  @Column("int", { primary: true, name: "id" })
  id?: number;

  @Column("date", { name: "startDate", nullable: true })
  startDate?: string | null;

  @Column("date", { name: "endDate", nullable: true })
  endDate?: string | null;

  @Column("time", { name: "startTime", nullable: true })
  startTime?: string | null;

  @Column("time", { name: "endTime", nullable: true })
  endTime?: string | null;

  @OneToMany(() => Artist, (artist) => artist.schedule)
  artists?: Artist[];

  @ManyToMany(() => Stage, (stage) => stage.schedules)
  stages?: Stage[];
}

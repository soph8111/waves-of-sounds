import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Schedule } from "./Schedule";
import { Stage } from "./Stage";
import { Genre } from "./Genre";

@Index("fk_artist_schedule1_idx", ["scheduleId"], {})
@Index("fk_artist_stage1_idx", ["stageId"], {})
@Entity("artist", { schema: "wavesOfSounds" })
export class Artist {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name?: string | null;

  @Column("varchar", { name: "bio", nullable: true, length: 500 })
  bio?: string | null;

  @Column("varchar", { name: "spotify", nullable: true, length: 225 })
  spotify?: string | null;

  @Column("varchar", { name: "image", nullable: true, length: 225 })
  image?: string | null;

  @Column("int", { name: "schedule_id" })
  scheduleId?: number;

  @Column("int", { name: "stage_id" })
  stageId?: number;

  @ManyToOne(() => Schedule, (schedule) => schedule.artists, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "schedule_id", referencedColumnName: "id" }])
  schedule?: Schedule;

  @ManyToOne(() => Stage, (stage) => stage.artists, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "stage_id", referencedColumnName: "id" }])
  stage?: Stage;

  @ManyToMany(() => Genre, (genre) => genre.artists)
  @JoinTable({
    name: "artist_has_genre",
    joinColumns: [{ name: "artist_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "genre_id", referencedColumnName: "id" }],
    schema: "wavesOfSounds",
  })
  genres?: Genre[];
}

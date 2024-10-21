import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "./Artist";

@Entity("genre", { schema: "wavesOfSounds" })
export class Genre {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name?: string | null;

  @ManyToMany(() => Artist, (artist) => artist.genres)
  artists?: Artist[];
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("article", { schema: "wavesOfSounds" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("timestamp", { name: "date", nullable: true })
  date?: Date | null;

  @Column("varchar", { name: "title", nullable: true, length: 45 })
  title?: string | null;

  @Column("mediumtext", { name: "article", nullable: true })
  article?: string | null;

  @Column("varchar", { name: "image", nullable: true, length: 225 })
  image?: string | null;
}

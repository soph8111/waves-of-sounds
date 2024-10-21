import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("newsletter", { schema: "wavesOfSounds" })
export class Newsletter {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number;

  @Column("varchar", { name: "name", nullable: true, length: 45 })
  name?: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 225 })
  email?: string | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt?: Date | null;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { schema: "wavesOfSounds" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id!: number;

  @Column("varchar", { name: "email", length: 225 })
  email!: string;

  @Column("varchar", { name: "password_hash", length: 225 })
  password_hash!: string;

  @Column("tinyint", { name: "is_admin", width: 1, default: () => "'0'" })
  is_admin!: boolean;
}

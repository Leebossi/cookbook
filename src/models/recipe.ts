import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "recipe" })
class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "varchar", nullable: true })
  type: string | null;
}

export default Recipe;
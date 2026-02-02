import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Ingredient from "./ingredient";

@Entity({ name: "recipe" })
class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "varchar", nullable: true })
  type: string | null;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients!: Ingredient[];
}

export default Recipe;
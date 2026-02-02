import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Ingredient from "./ingredient";
import Instruction from "./instruction";

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

  @OneToMany(() => Instruction, (instruction) => instruction.recipe)
  instructions!: Instruction[];
}

export default Recipe;
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Recipe from "./recipe";

@Entity({ name: "ingredient" })
class Ingredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "float" })
  amount!: number;

  @Column()
  unit!: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, { onDelete: "CASCADE" })
  @JoinColumn({ name: "recipeId" })
  recipe!: Recipe;

  @Column()
  recipeId!: number;
}

export default Ingredient;

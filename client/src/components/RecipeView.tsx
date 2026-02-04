import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import type { Recipe } from "../types/recipe";

function RecipeView() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) {
        setError("No recipe ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<Recipe>(
          `http://localhost:3001/api/recipes/${recipeId}`,
        );
        setRecipe(response.data);
      } catch (error) {
        setError("Failed to load recipe: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return <div className="recipe-view">Loading...</div>;
  }

  if (error) {
    console.error(error);
  }

  if (!recipe) {
    return <div className="recipe-view">Recipe not found</div>;
  }

  return (
    <div className="recipe-view">
      <div className="selected-recipe">
        <h2>{recipe.name}</h2>
        {recipe.type && <p>Type: {recipe.type}</p>}
        <div>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients?.map((ing) => (
              <li key={ing.id}>
                {ing.amount} {ing.unit} {ing.name}
              </li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <ol>
            {recipe.instructions?.map((inst) => (
              <li key={inst.id}>{inst.instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeView;

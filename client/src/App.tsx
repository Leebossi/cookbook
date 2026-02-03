import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import RecipeSearch from "./components/RecipeSearch";
import SelectedRecipe from "./components/SelectedRecipe";
import type { Recipe } from "./types/recipe";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<Recipe[]>(
          "http://localhost:3001/api/recipes",
        );
        setRecipes(response.data);
      } catch (error) {
        setError("Failed to load recipes: " + error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (selectedRecipe?.id) {
      const fetchRecipeDetails = async () => {
        try {
          const response = await axios.get<Recipe>(
            `http://localhost:3001/api/recipes/${selectedRecipe.id}`,
          );
          setRecipeDetails(response.data);
        } catch (error) {
          setError("Failed to load recipe details: " + error);
        }
      };

      fetchRecipeDetails();
    }
  }, [selectedRecipe?.id]);

  return (
    <div className="app">
      <h1>Recipes</h1>
      {error && <p className="error">{error}</p>}
      <RecipeSearch recipes={recipes} onSelect={setSelectedRecipe} />
      <SelectedRecipe
        selectedRecipe={selectedRecipe}
        recipeDetails={recipeDetails}
      />
    </div>
  );
}

export default App;

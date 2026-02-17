import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import RecipeSearch from "./components/RecipeSearch";
import type { Recipe } from "./types/recipe";
import { Link, Outlet, useNavigate } from "react-router";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("cookbook_token"));

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

  const handleSelectRecipe = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div className="app">
      {isLoggedIn && <Link to="/add" className="add-recipe-link">Add Recipe</Link>}
      <h1>Recipes</h1>
      {error && <p className="error">{error}</p>}
      <RecipeSearch recipes={recipes} onSelect={handleSelectRecipe} />
      <Outlet />
    </div>
  );
}

export default App;

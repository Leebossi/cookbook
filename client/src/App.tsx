import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

type Recipe = {
  id: number;
  name: string;
  type: string | null;
  ingredients?: {
    id: number;
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions?: {
    id: number;
    step: number;
    instruction: string;
  }[];
};

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeDetails, setRecipeDetails] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  useEffect(() => {
    console.log("Selected recipe changed to:", selectedRecipe);
  }, [selectedRecipe]);

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.type &&
        recipe.type.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  console.log(recipes);
  return (
    <div className="app">
      <h1>Recipes</h1>
      {error && <p className="error">{error}</p>}

      <div className="search-container">
        <input
          type="text"
          id="search"
          className="search-input"
          placeholder="Search recipes by name or type..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => setShowSuggestions(searchTerm.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          autoComplete="false"
        />

        {showSuggestions && filteredRecipes.length > 0 && (
          <div className="suggestions">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="suggestion-item"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRecipe(recipe);
                  setShowSuggestions(false);
                }}
              >
                <div className="recipe-name">{recipe.name}</div>
                {recipe.type && (
                  <div className="recipe-type">{recipe.type}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {showSuggestions && filteredRecipes.length === 0 && searchTerm && (
          <div className="suggestions">
            <div className="suggestion-item no-results">No recipes found</div>
          </div>
        )}
      </div>
      {selectedRecipe && (
        <div className="selected-recipe">
          <h2>{selectedRecipe.name}</h2>
          {selectedRecipe.type && <p>Type: {selectedRecipe.type}</p>}
          {recipeDetails && (<div>
            <h3>Ingredients:</h3>
            <ul>
              {recipeDetails.ingredients?.map((ing) => (
                <li key={ing.id}>
                  {ing.amount} {ing.unit} {ing.name}
                </li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <ol>
              {recipeDetails.instructions?.map((inst) => (
                <li key={inst.id}>{inst.instruction}</li>
              ))}
            </ol>
          </div>)}
        </div>
      )}
    </div>
  );
}

export default App;

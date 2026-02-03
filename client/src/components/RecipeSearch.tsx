import { useMemo, useState } from "react";
import type { Recipe } from "../types/recipe";

type RecipeSearchProps = {
  recipes: Recipe[];
  onSelect: (recipe: Recipe) => void;
};

function RecipeSearch({ recipes, onSelect }: RecipeSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredRecipes = useMemo(
    () =>
      recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (recipe.type &&
            recipe.type.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    [recipes, searchTerm],
  );

  return (
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
                onSelect(recipe);
                setShowSuggestions(false);
              }}
            >
              <div className="recipe-name">{recipe.name}</div>
              {recipe.type && <div className="recipe-type">{recipe.type}</div>}
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
  );
}

export default RecipeSearch;

import type { Recipe } from "../types/recipe";

type SelectedRecipeProps = {
  selectedRecipe: Recipe | null;
  recipeDetails: Recipe | null;
};

function SelectedRecipe({ selectedRecipe, recipeDetails }: SelectedRecipeProps) {
  if (!selectedRecipe) {
    return null;
  }

  return (
    <div className="selected-recipe">
      <h2>{selectedRecipe.name}</h2>
      {selectedRecipe.type && <p>Type: {selectedRecipe.type}</p>}
      {recipeDetails && (
        <div>
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
        </div>
      )}
    </div>
  );
}

export default SelectedRecipe;

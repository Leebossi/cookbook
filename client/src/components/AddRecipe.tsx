import { useMemo, useState } from "react";

type ParsedIngredient = {
  name: string;
  amount: string | null;
  unit: string | null;
};

type ParsedRecipe = {
  title: string;
  ingredients: ParsedIngredient[];
  steps: string[];
};

const parseRecipeInput = (input: string): ParsedRecipe => {
  const lines = input.split(/\r?\n/).map((line) => line.trim());

  let index = 0;
  while (index < lines.length && lines[index] === "") {
    index += 1;
  }

  const title = lines[index] ?? "";
  index += 1;

  const ingredients: ParsedIngredient[] = [];
  const steps: string[] = [];
  let section: "ingredients" | "steps" = "ingredients";

  for (; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line) {
      if (section === "ingredients" && ingredients.length > 0) {
        section = "steps";
      }
      continue;
    }

    const normalizedLine = line.replace(/^-+\s*/, "");

    if (section === "ingredients") {
      const [namePart, amountPart] = normalizedLine
        .split("/")
        .map((part) => part.trim());
      const amountTokens = amountPart ? amountPart.split(/\s+/) : [];

      ingredients.push({
        name: namePart || normalizedLine,
        amount: amountTokens[0] ?? null,
        unit: amountTokens.slice(1).join(" ") || null,
      });
    } else {
      steps.push(normalizedLine);
    }
  }

  return { title, ingredients, steps };
};

export const AddRecipe = () => {
  const [input, setInput] = useState("");
  const parsed = useMemo(() => parseRecipeInput(input), [input]);

  return (
    <section className="add-recipe">
      <h2>Add a Recipe</h2>
      <form className="add-recipe__form" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="recipe-input" className="add-recipe__label">
          Paste recipe text
        </label>
        <textarea
          id="recipe-input"
          className="add-recipe__textarea"
          placeholder={
            "Title\n\n- ingredient 1 / amount unit\n- ingredient 2 / amount unit\n\n- instruction step 1\n- instruction step 2"
          }
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={12}
        />
      </form>

      <div className="add-recipe__preview">
        <h3>Parsed preview</h3>
        <p className="add-recipe__title">
          {parsed.title ? parsed.title : "(Add a title to start)"}
        </p>
        <div className="add-recipe__columns">
          <div>
            <h4>Ingredients</h4>
            {parsed.ingredients.length === 0 ? (
              <p className="add-recipe__empty">No ingredients yet.</p>
            ) : (
              <ul>
                {parsed.ingredients.map((ingredient, idx) => (
                  <li key={`${ingredient.name}-${idx}`}>
                    {ingredient.amount && ingredient.unit
                      ? `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`
                      : ingredient.amount
                        ? `${ingredient.amount} ${ingredient.name}`
                        : ingredient.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h4>Steps</h4>
            {parsed.steps.length === 0 ? (
              <p className="add-recipe__empty">No steps yet.</p>
            ) : (
              <ol>
                {parsed.steps.map((step, idx) => (
                  <li key={`${step}-${idx}`}>{step}</li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

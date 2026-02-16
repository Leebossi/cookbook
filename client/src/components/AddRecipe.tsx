import { useMemo, useState } from "react";
import axios from "axios";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

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

const DRAFT_STORAGE_KEY = "cookbook_add_recipe_draft";

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
  const navigate = useNavigate();
  const [input, setInput] = useState(
    () => localStorage.getItem(DRAFT_STORAGE_KEY) ?? "",
  );
  const parsed = useMemo(() => parseRecipeInput(input), [input]);
  const [token, setToken] = useState(() =>
    localStorage.getItem("cookbook_token"),
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (newToken: string) => {
    localStorage.setItem("cookbook_token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("cookbook_token");
    setToken(null);
  };

  const handleClearInput = () => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setInput("");
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    localStorage.setItem(DRAFT_STORAGE_KEY, value);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  const handleCreateRecipe = async () => {
    setError(null);
    setSuccess(null);

    if (!parsed.title.trim()) {
      setError("Title is required.");
      return;
    }

    const ingredients = parsed.ingredients
      .map((ingredient) => {
        const amount = ingredient.amount ? Number(ingredient.amount) : NaN;
        const unit = ingredient.unit?.trim() ?? "";

        if (!ingredient.name.trim() || !unit || Number.isNaN(amount)) {
          return null;
        }

        return {
          name: ingredient.name.trim(),
          amount,
          unit,
        };
      })
      .filter(
        (
          ingredient,
        ): ingredient is { name: string; amount: number; unit: string } =>
          Boolean(ingredient),
      );

    const instructions = parsed.steps
      .map((step) => step.trim())
      .filter(Boolean)
      .map((instruction, index) => ({
        step: index + 1,
        instruction,
      }));

    if (ingredients.length === 0) {
      setError("Add at least one ingredient with amount and unit.");
      return;
    }

    if (instructions.length === 0) {
      setError("Add at least one instruction step.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3001/api/recipes",
        {
          name: parsed.title.trim(),
          type: null,
          ingredients,
          instructions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess("Recipe created.");
      handleClearInput();
    } catch (error) {
      console.error(error);
      setError("Failed to create recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-recipe">
      <div className="add-recipe__header">
        <h2>Add a Recipe</h2>
        <button type="button" onClick={() => navigate("/")}>
          Go to Home
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="add-recipe__logout"
        >
          Log out
        </button>
      </div>
      <form
        className="add-recipe__form"
        onSubmit={(event) => event.preventDefault()}
      >
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
          onChange={(event) => handleInputChange(event.target.value)}
          rows={12}
        />
        <div className="add-recipe__actions">
          <button
            type="button"
            onClick={handleClearInput}
            className="add-recipe__clear"
          >
            clear
          </button>
          <button type="button" onClick={handleCreateRecipe} disabled={loading}>
            {loading ? "Creating..." : "Create recipe"}
          </button>
          {error && <span className="add-recipe__error">{error}</span>}
          {success && <span className="add-recipe__success">{success}</span>}
        </div>
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

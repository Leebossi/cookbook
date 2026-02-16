import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import RecipeView from "./components/RecipeView.tsx";
import { AddRecipe } from "./components/AddRecipe.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/" element={<App />}>
          <Route path="recipe/:recipeId" element={<RecipeView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

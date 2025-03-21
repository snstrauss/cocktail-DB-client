import { BrowserRouter, Routes, Route } from "react-router";
import CommonPageLayout from "./pages/CommonPageLayout/CommonPageLayout";
import HomePage from "./pages/HomePage/HomePage";
import CocktailRecipePage from "./pages/CocktailRecipe/CocktailRecipe";
import AddRecipe from "./pages/AddRecipe/AddRecipe";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CommonPageLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:cocktailId" element={<CocktailRecipePage />} />
          <Route path="/add" element={<AddRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router";
import CommonPageLayout from "./pages/CommonPageLayout/CommonPageLayout";
import HomePage from "./pages/HomePage/HomePage";
import CocktailRecipe from "./pages/CocktailRecipe/CocktailRecipe";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CommonPageLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:drink" element={<CocktailRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

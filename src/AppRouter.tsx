import { BrowserRouter, Routes, Route } from "react-router";
import AllCocktailsList from "./pages/AllCocktailsList/AllCocktailsList";
import CommonPageLayout from "./pages/CommonPageLayout/CommonPageLayout";
import CocktailRecipe from "./pages/CocktailRecipe/CocktailRecipe";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CommonPageLayout />}>
          <Route path="/" element={<AllCocktailsList />} />
          <Route path="/recipe/:drink" element={<CocktailRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

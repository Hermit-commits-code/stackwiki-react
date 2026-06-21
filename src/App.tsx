import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { TranscriptConverterPage } from "./pages/TranscriptConverterPage";
import { ConversionsPage } from "./pages/ConversionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route
            path="/articles/:category/:slug"
            element={<ArticleDetailPage />}
          />
          <Route
            path="/transcript-converter"
            element={<TranscriptConverterPage />}
          />
          <Route path="/conversions" element={<ConversionsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

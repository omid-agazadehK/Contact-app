import { BrowserRouter, Routes, Route } from "react-router";
import MainPage from "./pages/MainPage";
import CreateUserPage from "./pages/CreateUserPage";
import EditPage from "./pages/EditPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="create-user" element={<CreateUserPage />} />
        <Route path="user/:id" element={<EditPage />} />
        <Route path="user/:id" element={<EditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import './App.css';
import MainView from './Componentes/MainView';
import AboutPage from "./Componentes/AboutPage";
import WelcomePage from "./Componentes/WelcomePage";
import GenerateRecipe from "./Componentes/GenerateRecipe";
import { useAuth } from "./Componentes/AuthContext.js";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
      <Route path="/" element={!isLoggedIn ? <WelcomePage /> : <Navigate to="/mainview" />} />
<Route path="/mainview" element={<MainView />} />
        <Route path="/aboutpage" element={<AboutPage />} />
        <Route path="/generaterecipe" element={<GenerateRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;


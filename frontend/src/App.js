import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import SingleNote from "./screens/SingleNote/SingleNote";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/SingleNote/CreateNote";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route 
            path="/mynotes" 
            element={<MyNotes search={search} />} 
          />
          <Route path="/note/:id" element={<SingleNote />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

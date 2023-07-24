import Home from "./pages/Home";
import Details from "./pages/Details";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <main className="bg-very-light-gray dark:bg-dm-very-dark-blue">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<Details />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

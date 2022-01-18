import Navbar from "./Navbar/Navbar";
import "./App.css";
import Hero from "./Body/Hero";
import Category from "./Body/Category";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Category />
    </div>
  );
}

export default App;

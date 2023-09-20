import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import StudentCrud from "./components/StudentCrud";
import './App.css';
function App() {
  return (
    <div>
      <Navbar/>
      <StudentCrud/>
      <Contact/>
    </div>
  );
}

export default App;

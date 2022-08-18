import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <div className="container my-3">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/home" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;

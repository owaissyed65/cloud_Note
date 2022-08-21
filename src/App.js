import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import LoadingBar from 'react-top-loading-bar'
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import { useState } from 'react'
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (type, message) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  const [progress, setProgress] = useState(0)
  const bar = (loading) =>{
    setProgress(loading)
  }
  return (
    <>

      <NoteState>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
            // onLoaderFinished={{progress:progress}}
          />
          <Alert alert={alert} />
          <div className="container my-3">
            <Routes>
              <Route exact path="/" element={<Home  showAlert={showAlert} />}></Route>
              <Route exact path="/home" element={<Home showAlert={showAlert} />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} bar={bar} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} bar={bar} />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;

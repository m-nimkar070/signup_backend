import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./components/Login/Login.js";
import Signup from "./components/signup/Signup.js";
import Home from "./components/Home/Home.js";
import { UrlProvider } from './components/Context/urlContext.js';

function App() {
  return (
    <>
    <UrlProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UrlProvider>
    </>
  );
}

export default App;

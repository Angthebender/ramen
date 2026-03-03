import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import { HomePage } from "./pages/HomePage";
import R from "../src/assets/images/R.png";
import A from "../src/assets/images/A.png";
import M from "../src/assets/images/M.png";
import E from "../src/assets/images/E.png";
import N from "../src/assets/images/N.png";
import EE from "../src/assets/images/EE.png";
import W from "../src/assets/images/W.png";
import { AboutPage } from "./pages/AboutPage";

<link
  href="https://fonts.googleapis.com/css2?family=Moirai+One&family=Patrick+Hand&display=swap"
  rel="stylesheet"
></link>;
function App() {
  return (
    <div>
      <div className="d-flex gap-4 justify-content-center">
        <div
          className="title d-flex justify-content-center  mt-3"
          style={{ height: "100px", cursor: "pointer" }}
          onClick={() => {
            window.location.assign("/");
          }}
        >
          {/*the css is done in index.css */}
          <Image src={R} alt="R" fluid className="img-r" />
          <Image src={A} alt="A" fluid className="img-a" />
          <Image src={M} alt="M" fluid className="img-m" />
          <Image src={E} alt="E" fluid className="img-e" />
          <Image src={N} alt="N" fluid className="img-n" />
          <Image src={EE} alt="EE" fluid className="img-ee" />
          <Image src={W} alt="W" fluid className="img-w" />
        </div>
        <i
          className="search-button bi bi-search"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.location.assign("/search");
          }}
        ></i>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results/:id" element={<ResultsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
      <hr></hr>
      <div className="d-flex justify-content-center ">
        <a className="nav-link" href="/about">
          About page
        </a>
        <br />
        <br />
      </div>
    </div>
  );
}

export default App;

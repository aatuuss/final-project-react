import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Beranda from "./pages/beranda/Beranda";
import { Footer } from "./components/Footer";
import { DetailBeranda } from "./pages/detail/DetailBeranda";
import { Favorite } from "./pages/Favorite";
import { Rating } from "./pages/Rating";
import ThemeContext from "./components/context/ThemeContext";
import { Provider } from "react-redux";
import store from "./store/Store";
import Categories from "./pages/categories/Categories";
import { DetailFilm } from "./pages/DetailFilm";


export default function App() {

  const theme = useState("light");
  return (
    <BrowserRouter>
    <ThemeContext.Provider value={theme}>
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/detail/:id" element={<DetailBeranda />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/movie/:movieId" element={<DetailFilm />} />
      </Routes>
      <Footer/>
      </Provider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

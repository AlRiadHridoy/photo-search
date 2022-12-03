import React from "react";
import PhotoContainer from "./components/PhotoContainer.js";
import Search from "./components/Search.js";
import Style from "./components/Style.js";
import { useGlobalContext } from "./context/useGlobalContext.js";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SinglePhoto from "./components/SinglePhoto.js";


function App() {
  const {theme} = useGlobalContext();
  return (
    <main className={`root ${theme}`}>
      <div
        className={` ${
          theme === "dark" ? "bg_dark" : "bg_light"
        } md:p-10 px-4 py-8 min-w-full min-h-screen bg-slate-50 dark:bg-[#152652]`}
      >
        <div className="container mx-lg m-auto relative">
          {theme === "dark" && <Style />}
          <BrowserRouter>
            <Search />
            <Routes>
              <Route path="/" element={<PhotoContainer />} />
              <Route path={`/photo=:id`} element={<SinglePhoto />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </main>
  );
}

export default App;

//  bg-gradient-to-r from-blue-400 via-blue-800 to-gray-700

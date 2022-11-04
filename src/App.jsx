import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import Page from "./components/Page";
import Page from "./components/pages/Page";
import ThemeContext from "./context/context";
import { useState } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Page />}>
      {" "}
      {/* <Route path="dashboard" element={<Dashboard />} />
                  ... etc. */}{" "}
    </Route>
  )
);

function App() {
  const [selectedPost, setSelectesPost] = useState("");
  return (
    <ThemeContext.Provider
      value={{
        selectedPost: selectedPost,
        setSelectesPost: setSelectesPost,
      }}
    >
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}

export default App;

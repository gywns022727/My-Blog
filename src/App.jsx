import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import Page from "./components/Page";
import Page from "./components/pages/Page";
import AppContext from "./context/AppContext";
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
  const [selectedPost, setSelectedPost] = useState("");
  return (
    <AppContext.Provider
      value={{
        selectedPost: selectedPost,
        setSelectedPost: setSelectedPost,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;

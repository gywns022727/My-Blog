import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import Page from "./components/Page";
import Page from "./components/pages/Page";
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
  return <RouterProvider router={router} />;
}

export default App;

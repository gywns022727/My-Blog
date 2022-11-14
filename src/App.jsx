import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Page from "./components/pages/Page";
import AppContext from "./context/AppContext";
import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./style/theme";
import { GlobalStyle } from "./style/GlobalStyle";
import axios from "axios";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Page />} />)
);

function App() {
  const [theme, setTheme] = useState("dark");
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedPost, setSelectedPost] = useState("");
  const [postData, setPostData] = useState([]);
  const [openPost, setOpenPost] = useState([]);

  useEffect(() => {
    async function fetch() {
      const { data: responsePostData } = await axios.get(
        "http://localhost:4000/post/all"
      );
      console.log(responsePostData);
      setPostData(responsePostData);
    }
    fetch();
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedPost: selectedPost,
        setSelectedPost: setSelectedPost,
        openPost: openPost,
        setOpenPost: setOpenPost,
        postData: postData,
        theme: theme,
        setTheme: setTheme,
        selectedTag: selectedTag,
        setSelectedTag: setSelectedTag,
      }}
    >
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;

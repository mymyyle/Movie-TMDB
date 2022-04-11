import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePages from "./pages/HomePages";
import MovieDetails from "./pages/MovieDetails";
import BrowsePage from "./pages/BrowsePage";
import Layout from "./layouts/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import DataContextProvider from "./contexts/DataContext";
import AuthRequire from "./contexts/AuthRequire";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import AccountPage from "./pages/AccountPage";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1f1f1f",
      },
      secondary: {
        main: "#428bca",
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <FavoriteProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePages />} />
                <Route
                  path="/browser"
                  element={
                    <DataContextProvider>
                      <BrowsePage />
                    </DataContextProvider>
                  }
                />
                <Route path="/movie/:movieId" element={<MovieDetails />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/favorite"
                  element={
                    <DataContextProvider>
                      <AuthRequire>
                        <AccountPage />
                      </AuthRequire>
                    </DataContextProvider>
                  }
                />
              </Route>
            </Routes>
          </FavoriteProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

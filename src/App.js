import "./App.css";
import Landing from "./pages/LandingPage/LandingPage";
import { Box, Container, ThemeProvider, createTheme } from "@mui/material";
// import Navbar from "./components/Navbar/Navbar";

const font = "'Noto Sans', sans-serif";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1A2127",
      text: "#EFFBFF",
      highlight: "#D3FBD8",
    },
  },
  typography: {
    fontFamily: font,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="primary.main" className="App">
        {/* <Navbar /> */}
        <Landing />
      </Box>
    </ThemeProvider>
  );
}

export default App;

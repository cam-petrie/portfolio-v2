import "./App.css";
import Landing from "./pages/LandingPage/LandingPage";
import { Box, ThemeProvider, createTheme } from "@mui/material";

const font = "'Noto Sans', sans-serif";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1A2127",
      light: "#31373d",
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
        <Landing />
      </Box>
    </ThemeProvider>
  );
}

export default App;

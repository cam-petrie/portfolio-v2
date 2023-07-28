import "./App.css";
import Landing from "./pages/LandingPage/LandingPage";
import { Box, ThemeProvider, createTheme } from "@mui/material";

const font = "'Noto Sans', sans-serif";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1A2127",
      light: "#1f282f",
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
      <Box bgcolor={theme.palette.primary.main} className="App">
        <Landing />
      </Box>
    </ThemeProvider>
  );
}

export default App;

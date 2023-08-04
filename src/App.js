import "./App.css";
import Landing from "./pages/LandingPage/LandingPage";
import { Box, ThemeProvider, createTheme } from "@mui/material";

const font = "'Noto Sans', sans-serif";

// export const theme = createTheme({
//   palette: {
//     primary: {
//       //main: "#6b705c",
//       main: "#c9e4de",
//       light: "#d8e2dc",
//       text: "#253237",
//       lighterText: "#202c39", //641220
//       highlight: "#202c39",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#022b3a",
//       light: "#1b404e",
//       text: "#ffffff",
//       lighterText: "#bfc0c0",
//       highlight: "#bfdbf7",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

//home depot colors theme:
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#2d3142",
//       light: "#424655",
//       text: "#ffffff",
//       lighterText: "#bfc0c0",
//       highlight: "#ef8354",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

//blueish colors high contrast turquoise theme:
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1c2541",
//       light: "#5bc0be",
//       text: "#ffffff",
//       lighterText: "",
//       highlight: "#6fffe9",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

//pastelle purple theme
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#9381ff",
//       light: "#9e8eff",
//       text: "#f8f7ff",
//       lighterText: "",
//       highlight: "#ffcb77",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

//steelers theme:
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#000000",
//       light: "#121212",
//       text: "#e8eddf",
//       lighterText: "",
//       highlight: "#fdb827",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

//cleveland browns colors kind of:
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#252422",
//       light: "#403d39",
//       text: "#fffcf2",
//       lighterText: "",
//       highlight: "#eb5e28",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

//like this one a lot:
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#161a1d",
//       light: "#222528",
//       text: "#ffffff",
//       highlight: "#e5383b",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

//dark blue
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#011627",
//       light: "#1a2d3d",
//       text: "#fdfffc",
//       highlight: "#2ec4b6",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

//maroon theme:
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#540b0e",
//       light: "#652326",
//       text: "#fff3b0",
//       highlight: "#e09f3e",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

//pastelle-ish theme:
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#84a59d",
//       light: "#90aea7",
//       text: "#f7ede2",
//       highlight: "#f5cac3",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

//purples theme:
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#480ca8",
//       light: "#560bad",
//       text: "#FFF",
//       highlight: "#4cc9f0",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

//shades of blue theme:
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1d3557",
//       light: "#1a304e",
//       text: "#f1faee",
//       highlight: "#a8dadc",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

// orange & blue theme:
export const theme = createTheme({
  palette: {
    primary: {
      main: "#023047",
      light: "#022b40",
      text: "#FFF",
      highlight: "#ffb703",
    },
  },
  typography: {
    fontFamily: font,
  },
});

//original theme:
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1A2127",
//       light: "#1f282f",
//       text: "#EFFBFF",
//       highlight: "#D3FBD8",
//     },
//   },
//   typography: {
//     fontFamily: font,
//   },
// });

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

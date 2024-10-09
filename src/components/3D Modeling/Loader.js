import { Html, useProgress } from "@react-three/drei";
import { CircularProgress, Box } from "@mui/material";

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()

    // console.log("loader: ", { active, progress, errors, item, loaded, total });
    return <Html center>{progress} % loaded</Html>
  }

  export default Loader;

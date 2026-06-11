import { createContext, useContext, useState } from "react";

const ObjectAnimationsContext = createContext();

export const ObjectAnimationsProvider = (props) => {
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animations, setAnimations] = useState([]);
  return (
    <ObjectAnimationsContext.Provider
      value={{ animationIndex, setAnimationIndex, animations, setAnimations }}
    >
      {props.children}
    </ObjectAnimationsContext.Provider>
  );
};

export const useObjectAnimations = () => {
  return useContext(ObjectAnimationsContext);
};

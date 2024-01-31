import { createContext, useState } from "react";

const ThemeContext = createContext<boolean>(false);

function ThemeProvider(props) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = (dark) => {
    setDarkMode(!darkMode);
  };
  return (
    <div>
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {props.children}
      </ThemeContext.Provider>
    </div>
  );
}

export { ThemeContext, ThemeProvider };

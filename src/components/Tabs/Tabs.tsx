import { ReactNode, useContext, useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomTable from "../Table/CustomTable";
import CTF from "../CTF/CTF";
// import useDebounce from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "../../context/ThemeContext";
import { Button } from "@mui/material";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// put this somewhere else
const fetchDataset = async () => {
  const response = await fetch("https://data.nasa.gov/resource/y77d-th95.json");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function BasicTabs() {
  const localData = localStorage.getItem("favorites");
  const [value, setValue] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { darkMode, toggleDarkMode } =
    useContext<ThemeContextType>(ThemeContext);

  useEffect(() => {
    setFavorites(localData ? JSON.parse(localData) : []);
  }, [localData]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["dataSet"],
    queryFn: fetchDataset,
    // set stale time to 24 hours
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (isLoading) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "15%" }}> Loading... </h1>
    );
  }

  if (error) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "15%" }}>
        {" "}
        Error: {JSON.stringify(error)}{" "}
      </h1>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs"
          variant="scrollable"
        >
          <Tab label="All Meteorites" {...a11yProps(0)} />
          <Tab label="Favorites" {...a11yProps(1)} />
          <Tab label="Fun Challenge" {...a11yProps(2)} />
          <Tab label="CTF Answer" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CustomTable
          data={data}
          setFavorites={setFavorites}
          favorites={favorites}
          tabNumber={value}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CustomTable
          data={favorites}
          tabNumber={value}
          setFavorites={setFavorites}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <h1> Capture the Flag Challenge</h1>
        <div>
          Go to the Link below and Traverse the Dom tree to find the hidden code{" "}
        </div>
        <div>
          https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge
        </div>
        <br />
        <div>
          Pattern of the DOM Tree code
          <br />
          data-class="23*" <br />
          div data-tag="*93" <br />
          span data-id="*21*" <br />
          i class="char" value="VALID_CHARACTER"
          <br />
        </div>
        <br />
        Unrelated useContext example
        {darkMode ? <div> DarkModeOn </div> : <div> DarkModeOff </div>}
        <Button onClick={toggleDarkMode}>Click me</Button>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <CTF />
      </CustomTabPanel>
    </Box>
  );
}

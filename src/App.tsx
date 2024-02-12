// import { useContext, createContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Router from "./routes";
import "react-toastify/dist/ReactToastify.css";
// import { worker } from "./mocks/browser";

function App() {
  const queryClient = new QueryClient();

  // working example at https://codesandbox.io/p/sandbox/wizardly-edison-6p7kxl?file=%2Fsrc%2FApp.js%3A8%2C34
  // json-server is another npm package that can be used to mock a server
  // useEffect(() => {
  //   fetch("/dataSet")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="App font-mono h-screen">
          <Header />
          <Router />
        </div>
      </ThemeProvider>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

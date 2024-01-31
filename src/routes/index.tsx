import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Home from '../pages/Home';

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Tabs from "../components/Tabs/Tabs";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Tabs />
          </PublicRoute>
        }
      />
      <Route
        path="/hidden"
        element={
          <PrivateRoute>
            <div> Private </div>
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default Router;

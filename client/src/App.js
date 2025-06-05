/*
    Data Baes
    2/28/2025

    Main component of React App. Handles UI, React components, and underlying logic of frontend
*/

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./MainPageComponents/MainPage";
import Login from "./LoginPageComponents/Login/Login";
import SignUp from "./SignUpComponents/SignUp";
import Profile from "./ProfilePageComponents/Profile";
import {StatusMessageProvider} from "./StatusMessageProvider";
import StatusMessageManager from "./StatusMessageManager";

const deploymentMode = process.env.DEPLOYMENT_MODE || 0;  // 1 for deployment, 0 for development
const backendPort = process.env.BACKEND_PORT || 3000;
const backendHost = process.env.BACKEND_HOST || "localhost";
const backendBaseURL = 'http://' + backendHost + ':' + backendPort;

if(deploymentMode == 0){
  console.log("development mode, backend port is " + backendPort + ", backend host is " + backendHost);
}

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  return (
    <StatusMessageProvider>
      <StatusMessageManager/>
      <RouterProvider router={router} />
    </StatusMessageProvider>
  );
}

export default App;
export { deploymentMode, backendPort, backendHost, backendBaseURL };
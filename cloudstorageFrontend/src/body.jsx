import React, {useState}  from "react";

import { Route, Routes } from "react-router-dom";
import PATHS from "./constants/pathConstants";
import Login from "./pages/LoginPage/Login";
import Api from "./pages/ApiPage/Api";
import Dashboard from "./pages/dashboardpage/dashboard";
import Plan from "./pages/planpage/plan";
import Documentation from "./pages/Documentationpage/Documentation";
import Storagemain from "./pages/Storagepage/Storagemain";
import File from "./pages/Storagepage/File";


function Body({user}) {



  return (
    <div className="body">
      <Routes>
    <Route path={PATHS.LOGIN} element={<Login/>} />
    <Route path={PATHS.API} element={<Api />} />
    <Route path={PATHS.DASHBOARD} element={<Dashboard user={user}/>} />
    <Route path={PATHS.PLAN} element={<Plan />} />
    <Route path={PATHS.DOCUMENTATION} element={<Documentation />} />
    <Route path={PATHS.STORAGEMAIN} element={<Storagemain />} />
    <Route path={`${PATHS.FILE}/:id`} element={<File />} />
    
</Routes>

     
    </div>
  );
}

export default Body;

import React from "react";
import {Routes, Route} from "react-router-dom"
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";
import Homepage from "./Homepage";


const AllRoutes = () => {

  return (
    <Routes>
      
      <Route path="/login" element={<LoginForm />}></Route>
      <Route path="/signup" element={<RegistrationForm/>}></Route>
      <Route path="/" element={<Homepage />}></Route>
    </Routes>
  )
};

export default AllRoutes;

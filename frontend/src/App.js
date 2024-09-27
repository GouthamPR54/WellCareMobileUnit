// import logo from "./logo.svg";
import "./App.css";
import React,{useEffect,useState} from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoute from "./Modules/admin/Route/AdminRoute";
import UserRoute from "./Modules/user/Route/UserRoute";
import theme from '../src/Modules/admin/component/Pages/theme';
import { ThemeProvider } from '@mui/material/styles';
import Login from "./Modules/user/Component/Login";
import Register from "./Modules/user/Component/Register";
import AdminLogin from "./Modules/admin/component/Pages/AdminLogin";

function App() {

  const [authtoken,setAuthtoken]=useState(false);


    useEffect(()=>{
        const user =JSON.parse(localStorage.getItem('token'));
        console.log("authtoken : ",user)
        if(user){
          setAuthtoken(true)
        }else{
          setAuthtoken(false)
        }
    },[])
  return (
    <div>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin/*" element={<AdminRoute />}/>
          <Route exact path="/*" element={<UserRoute/>}/>
          <Route exact path="/Login" element={<Login/>}/> 
          <Route exact path="/Register" element={<Register/>}/> 
          <Route exact path="/Adminlogin" element={<AdminLogin />} />
 </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

import React,{useEffect,useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
// import Navigation from '../Component/Nav/Navigation';
import Index from '../Component/Index'
import 'bootstrap/dist/css/bootstrap.min.css';
import Services from '../Component/Modules/Services';
import Treatments from '../Component/Modules/Treatments';
import Blogs from '../Component/Modules/Blogs';
import PrivateRoute from '../Component/Modules/PrivateRoute';
import Status from '../Component/Modules/Status';
import Profile from '../Component/Modules/Profile';
import Contact from '../Component/Modules/Contact';
// import Login from '../Component/Login';
// import Register from '../Component/Register';
import Booking from '../Component/Modules/Booking';
import ProgressTrackingPage from '../Component/Modules/Progress';
import Navigation from '../../user/Component/Nav/Navigation';
import theme from '../../admin/component/Pages/theme';
import { ThemeProvider } from '@mui/material/styles';
import AboutUs from '../Component/Modules/About';
import Footer from '../Component/Footer';



export default function AdminRoute() {
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

    console.log("authtoken token : ",authtoken)
    return (
        <div>
            <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
               <Box component="main" sx={{ flexGrow: 1, p: 2,background:'#f0f1f6',marginLeft:'-1%' }}>
               <Navigation authtoken={authtoken} setAuthtoken={setAuthtoken}/> 

                    <Routes>
                        <Route exact path="/" element={<Index />} />   
                        <Route exact path="/Services" element={<Services/>} />
                        <Route exact path="/Blogs" element={<Blogs/>} />
                        <Route exact path="/Booking" element={<Booking authtoken={authtoken}/>} />
                        <Route exact path="/contact" element={<Contact/>} />
                        <Route exact path="/Status" element={<Status/>} />
                        <Route exact path="/About" element={<AboutUs/>} />
                        {/* <Route exact path="/Login" element={<Login/>} />
                        <Route exact path="/Register" element={<Register/>} /> */}
                        <Route exact path="/Progress" element={<ProgressTrackingPage/>} />
                        <Route exact path="/treatments/:id/" element={<Treatments/>} />
                        <Route element={<PrivateRoute />}>
                        <Route path='/Profile' element={<Profile/>}/>
                        {/* <Route path='/Navigation' element={<Navigation authtoken={authtoken} setAuthtoken={setAuthtoken}/>}/> */}
                        </Route>
                    </Routes>
                    <Footer />
                </Box>

            </Box>
            </ThemeProvider>
        </div>
    )
}

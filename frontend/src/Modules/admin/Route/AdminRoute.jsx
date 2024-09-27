import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from '../component/Nav/Navigation'
import Box from '@mui/material/Box';
import Home from '../component/Pages/Home';
import { styled} from '@mui/material/styles';
import '../css/Style.css'
// import AppAppBar from '../component/Nav/AppAppBar';

import CssBaseline from '@mui/material/CssBaseline';
// import ManageCourse from '../component/Pages/ManageCourse';
// import ManageService from '../component/Pages/ManageService';
import ManageUser from '../component/Pages/ManageUser';
// import ViewChapters from '../component/Pages/ViewChapters';
// import Bookings from '../component/Pages/Bookings';
import Feedback from '../component/Pages/Feedback';
// import Clients from '../component/Pages/Clients';
import Blogs from '../component/Pages/Blogs';
import TreatmentDetail from '../component/Pages/TreatmentDetail';
import Treatments from '../component/Pages/Treatments';
import background1 from '../component/Image/background1.jpeg';
import Calendar from '../component/Pages/Calender';
import ManageBooking from '../component/Pages/ManageBooking';
// import ProgressManagementPage from '../component/Pages/Progress';


export default function AdminRoute() {
    // const [mode, setMode] = React.useState('light');
    // const toggleColorMode = () => {
    //     setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    //   };

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));
      
    return (
        <div>
            <Box sx={{display: 'flex'}}>
                <CssBaseline />
                <Navigation />
                <Box component="main" sx={{ flexGrow: 1, p: 2,background:'#f0f1f6',marginLeft:'-1%' }} style={{ padding: '20px',backgroundImage: `url(${background1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', }}>
                {/* <AppAppBar mode={mode} toggleColorMode={toggleColorMode} /> */}
                {/* <Box> */}
                    <DrawerHeader />
                    <Routes>
                    {/* <Route exact path="/manage-service" element={<ManageService />} /> */}
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/managebooking" element={<ManageBooking />} />
                        <Route exact path="/Blogs" element={<Blogs />} />
                        <Route exact path="/ManageUser" element={<ManageUser />} />
                        <Route exact path="/TreatmentDetail/:id" element={<TreatmentDetail />} />
                        {/* <Route exact path="/Progress" element={<ProgressManagementPage />} /> */}
                        <Route exact path="/Feedback" element={<Feedback />} />
                        <Route exact path="/Calender" element={<Calendar />} />
                        <Route exact path="/Treatments" element={<Treatments />} />
                    </Routes>
                {/* </Box> */}

            </Box>
            </Box>
        </div>
    )
}

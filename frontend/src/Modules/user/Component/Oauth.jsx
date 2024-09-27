import { Button } from '@mui/material'
import React from 'react'
import { GoogleAuthProvider, signInWithPopup,getAuth } from "firebase/auth";
import { app } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../Component/Redux/userSlice';
import config from './config';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const host = config.host;
  const handleGoogleClick = async() => {
    try{
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);


      const result= await signInWithPopup(auth,provider);
      const res =await fetch(`${host}/api/authenticate/google`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        }),
      });
      const data =await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/')
  }catch(error){
    console.error('Could not login with google', error);
  }
}
  return (
    <div>
      <Button type='button' component="a" onClick={handleGoogleClick} fullWidth
      variant="contained"
      size="large"
      style={{ backgroundColor: '#dd4b39', color: 'white' }}
      startIcon={<GoogleIcon />}> Sign in with Google</Button>
    </div>
  )
}

export default Oauth
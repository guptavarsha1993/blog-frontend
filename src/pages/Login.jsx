import React, {useState} from "react";
import {Box, FormLabel , TextField, Container, Typography, Button} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';



function Login()
{
  const navigate = useNavigate();

    const[credientials,setCredientials] = useState({
        email:'',
        password:''
    });

    const [error,setError] = useState('');
    const[isLoggedIn,setIsLoggedIn] = useState('');

    const handleChange =(e)=>{
        const {name,value} =e.target;
        setCredientials(prev=>({...prev,[name]:value}));


    };
    const handleSubmit =async(e)=>{
        e.preventDefault();

        const credientials_data = new FormData(e.target);
        //const obj = Object.fromEntries(credientials_data.entries()); 
        //console.log(obj);
        
        try{
            const response = await fetch("http://127.0.0.1:8001/api/login",{
                method:"POST",
                body: credientials_data
            });

            if(!response.ok){
                throw new Error('Login Failed');
            }

            const data = await response.json();

            localStorage.setItem('token',data.token);
            setIsLoggedIn(true);
        }catch(err)
        {
          setError(err.message);  
        }
        

    };


    if(isLoggedIn){
      navigate('/dashboard');
    }


    return (
        <>
         <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: '#007FFF',
            dark: '#0066CC',
          },
        },
      }}
    ></ThemeProvider>
         <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
         <Typography variant="h5">Login Form</Typography>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
             <TextField label="Email" name="email" onChange={handleChange} fullWidth required type="email" />
             <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth required />
           <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
          <Button type="reset" variant="outlined" color="secondary">Reset</Button>
        </Box>
        </form>
        </Box>
        
        </>
       
    

    );
}

export default Login;





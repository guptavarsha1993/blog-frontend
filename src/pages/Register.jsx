import React , { useState }  from "react";
import {Box, FormLabel ,Stack, TextField, Container, Typography, Button} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';



function Register()
{

  const [message, setMessage] = useState("");       // For success messages
  const [errors, setErrors] = useState({});  

        const handleSubmit =(e)=>{
        e.preventDefault();
        const data = new FormData(e.target);
        const obj = Object.fromEntries(data.entries());
        fetch('http://127.0.0.1:8001/api/register',{method:'POST', body:data})
        .then(response =>{
            if(!response.ok){
                throw new Error ("HTTP error");
            }
            return response.json();
        })
        .then(data=>  {
        setErrors({});
        setMessage("Registration successful!");
        })
        .catch(error =>{
        setMessage("");
        setErrors(error.errors || { error: ["Something went wrong."] });
        });
    };

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
        <Box component="section" sx={{ p: 2, border: '1px dashed grey',mb:5}} >
         <Typography variant="h5">Login Form</Typography>
         {message && <div className="alert alert-success">{message}</div>}

      {errors &&
        Object.keys(errors).map((field) =>
          errors[field].map((msg, idx) => (
            <div key={`${field}-${idx}`} className="alert alert-danger">
              {msg}
            </div>
          ))
        )}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
          <TextField label="First Name" name="first_name" fullWidth required  />
          <TextField label="Last Name" name="last_name" fullWidth required  />
          <TextField label="Email" name="email" fullWidth required type="email" />
          <TextField label="Password" name="password" type="password" fullWidth required />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
          </Stack>
        </form>
        </Box>
        </>
    );


}

export default Register;

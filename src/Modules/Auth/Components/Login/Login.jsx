import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {signInHandler} from "../../slice/authSlice"
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm({
        defaultValues: {
            email: "",
            passWord: "",
        },
        mode: "onTouched",
      });
      const onSubmit = async (user) => {
      
        try {
          await dispatch(signInHandler(user)).unwrap();   
          navigate("/project");
        } catch (error) {
           console.log(error);
        }
      };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
       
        <Box 
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <img
            width={'100%'}
            src='/logo-removebg-preview.png'
            alt='/logo-removebg-preview.png'
          />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box  noValidate sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: {
                  value: true,
                  message: 'This is required',
                },
                pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email không đúng định dạng",
                  },
              })}
              color={errors.email ? 'error' : ''}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('passWord', {
                required: {
                  value: true,
                  message: 'This is required',
                },
              })}
              color={errors.password ? 'error' : ''}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
         
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>             
              <Grid item>
                <Link style={{cursor: "pointer"}} onClick={()=> {
                   navigate("/register") 
                }} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
             </form>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
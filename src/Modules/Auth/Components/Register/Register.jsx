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
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {signUpHandler} from "../../slice/authSlice"

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

export default function SignUp() {
  const { error } = useSelector((state) => state.auth );
  
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
          name: "",
          phoneNumber: ""
      },
      mode: "onTouched",
    });
    const onSubmit = async (userInfo) => {
      
      try {
        await dispatch(signUpHandler(userInfo)).unwrap();   
        navigate("/login");
     
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
            Sign up
          </Typography>
          <Box  noValidate sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              {...register('name', {
                required: {
                  value: true,
                  message: 'Tên không được bỏ trống',
                },
                  minLength: {
                    value: 4,
                    message: "Tên phải có ít nhất 4 ký tự",
                  },
                  maxLength: {
                    value: 20,
                    message: "Tên phải có nhiều nhất 20 ký tự",
                  },
                pattern: {
                    value:
                      /[a-zA-Z]$/,
                    message: "Tên không đúng định dạng",
                  }
              })}
              color={errors.name ? 'error' : ''}
              error={!!errors.name }
              helperText={errors.name?.message}
            />
          
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
                  message: 'Email không được bỏ trống',
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
            
             {error ? <Alert severity="error">{error}</Alert> : ""}
            <TextField
              margin="normal"
              required
              fullWidth
              name="passWord"
              label="Password"
              type="passWord"
              id="passWord"
              autoComplete="current-password"
              {...register('passWord', {
                required: {
                  value: true,
                  message: 'Mật khẩu không được bỏ trống',
                },
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự hoặc số",
                  },
                  maxLength: {
                    value: 20,
                    message: "Mật khẩu phải có nhiều nhất 20 ký tự hoặc số",
                  },
                  pattern: {
                    value:
                      /[a-zA-Z0-9]$/,
                    message: "Mật khẩu không đúng định dạng",
                  }
              })}
              color={errors.passWord ? 'error' : ''}
              error={!!errors.passWord}
              helperText={errors.passWord?.message}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              label="Phone number"
              type="phoneNumber"
              id="phoneNumber"
              autoComplete="current-password"
              {...register('phoneNumber', {
                required: {
                  value: true,
                  message: 'This is required',
                },
                minLength: {
                  value: 8,
                  message: "Mật khẩu phải có ít nhất 8 số",
                }
                , pattern: {
                  value:
                    /[0-9+]$/,
                  message: "Số điện thoại không đúng định dạng",
                },
              })}
              color={errors.phoneNumber ? 'error' : ''}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
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
                   navigate("/login") 
                }} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
             </form>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}



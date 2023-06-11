import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MANAGER_PASSWODR, MANAGER_EMAIL } from '../config'
import { getCustomerByEmailAndPass } from '../Axios/customerAxios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setCustomer, setManager } from '../redux/actions/CustomersActions';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const defaultTheme = createTheme();

export const SignIn = () => {

  const [emailReq, setemailReq] = useState(false)
  const [passwordReq, setpasswordReq] = useState(false)
  const [emailValid, setemailValid] = useState(true)
  const [passwordValid, setpasswordValid] = useState(true)


  let dispatch = useDispatch()

  // משתמש למעבר בין הקומפוננטות
  const navigate = useNavigate()
  const location = useLocation()


  
  const checkEmail = (event) => {
    event.preventDefault()
    let email = event.currentTarget
    let len = email.length
    if(len > 1)
      setemailReq(false)
  }

  const checkPassword = (event) => { 
    event.preventDefault()
    let password = event.currentTarget   
    let len = password.length
    if(len > 1)
      setpasswordReq(false) 
  }


  // פונקציה להתחברות למערכת
  const Connect = (event) => {
    event.preventDefault()

    //validation from Ruby
    /*const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ email: '', password: '' });

    setFormData({ ...formData, [event.target.name]: event.target.value, });

    if (!formData.email) {
      errors.firstName = 'Email is required';
    }

    if (!formData.password) {
      errors.lastName = 'Password is required';
    }

    const validationSchema = Yup.object({
      email: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      password: Yup.string().email('Invalid email address').required('Required'),
    })

    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });*/



    const data = new FormData(event.currentTarget);
    let email = data.get('email') !== "" ? data.get('email') : "null"
    let password = data.get('password') !== "" ? data.get('password') : "null"

    //check validation
    if(email == "null")
        setemailReq(true)
    if(password == "null")
      setpasswordReq(true)
    
    let len = email.length
    let correctEmail1 = ['@', 'g', 'm', 'a', 'i', 'l', '.', 'c', 'o', 'm']
    let correctEmail2 = ['.', 'o', 'r', 'g', '.', 'i', 'l']

   

    if (email === MANAGER_EMAIL && password === MANAGER_PASSWODR) {
      dispatch(setManager(true))
      return
    }
    getCustomerByEmailAndPass(email, password).then(res => {
      if (res.data !== "") {
        Cookies.set("currentUser", JSON.stringify(res.data), { expires: 7 }) // 7 המידע נשמר 7 ימים בעוגיה
        dispatch(setCustomer(res.data))
        navigate('/')
      }
      else {
        let res = window.confirm('אינך קיים במערכת, אשר עבור מעבר להרשמה')
        if (res)
          navigate('/signUp')
      }
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar className='bg-primary p-4'>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={Connect} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={checkEmail}
              
            />
            {emailReq && <div style={{'color': "red"}}>Email is required.</div>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={checkPassword}             
            />
            {passwordReq && <div style={{'color': "red"}}>Password is required.</div>}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signUp">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

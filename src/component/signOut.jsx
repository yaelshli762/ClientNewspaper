
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
import { Link, useNavigate } from 'react-router-dom';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { Home } from '@mui/icons-material';


const defaultTheme = createTheme();

export const SignOut = () => {
    const localNavigate = useNavigate()
    localNavigate('/home')
    return<></>
}

export default SignOut
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import style from './Login.module.css';

const initState = {
  email: '',
  password: '',
};
export default function Login() {
  const [log, setLog] = useState(initState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const inputHandler = (e) => {
    setLog((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(log),
      });
      if (response.status === 200) {
        const result = await response.json();
        setShowSuccessMessage(true);
        setShowErrorMessage(false);
        setTimeout(() => {
          navigate('/notes');
        }, 2000);
      } else {
        console.error('Error', response.status)
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        setLog(initState);
        console.log('Try again');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.loginform}>
      <h3>Log In</h3>
      <p>Please enter your email and password:</p>
      <form onSubmit={submitHandler} className={style.form}>
        <br />
        <TextField
          onChange={inputHandler}
          id="standard-basic"
          label="Email"
          variant="standard"
          name="email"
          value={log.email}
          className={style.inputs}
        />
        <br />
        <TextField
          onChange={inputHandler}
          id="standard-basic"
          label="Password"
          variant="standard"
          name="password"
          value={log.password}
          className={style.inputs}
        />
        <br />
        <Button variant="outlined" type="submit" className={style.button}>
          Submit
        </Button>
        
          {showSuccessMessage && <Alert severity="success">Successfully log in</Alert>}
          {showErrorMessage && <Alert severity="warning">Account does not exist</Alert>}
       
      </form>
    </div>
  );
}

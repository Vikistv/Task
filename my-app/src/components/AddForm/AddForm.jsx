import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import style from './AddForm.module.css'

export default function AddForm() {
  const navigate = useNavigate();
  const [newNote, setNewNote] = useState({ title: '', text: '' });
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const inputHandler = (e) => {
    setNewNote((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/user/notes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body:JSON.stringify(newNote)
      })
      if (response.status === 200) {
      const result = await response.json()
      navigate('/notes')
      }else {
        setShowErrorMessage(true);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  return (
    
    
    
    <form onSubmit={submitHandler} className={style.addForm}>
      <TextField
      onChange={inputHandler}
        id="outlined-basic"
        label="Title"
        variant="outlined"
        name="title"
        value={newNote.title}
        className={style.input}
      />
      <TextField
      onChange={inputHandler}
        id="outlined-basic"
        label="Description"
        variant="outlined"
        name="text"
        value={newNote.text}
        className={style.input}
      />
      <Button variant="outlined" size="small" type="submit">
        Add
      </Button>
      {showErrorMessage && <Alert severity="warning">Please Log In</Alert>}
    </form>
    
  );
}

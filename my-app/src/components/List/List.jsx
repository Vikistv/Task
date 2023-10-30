import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Note from '../Note/Note';
import Alert from '@mui/material/Alert';
import style from './List.module.css'

export default function List() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    async function getAllNotes() {
      try {
        const response = await fetch('http://localhost:3001/user/notes', {
          credentials: 'include',
        });
        if (response.status === 200) {
        const data = await response.json();
        setNotes(data);
        }else{
          setShowErrorMessage(true);
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getAllNotes();
  }, []);

  
  return (
    <div className={style.list}>
       {showErrorMessage && <Alert severity="warning">Please Log In</Alert>}
      {notes?.map((note) => (
        <div key={note.id}>
          <Note title={note.title} text={note.text} id={note.id} setNotes={setNotes}/>
        </div>
      ))}
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from './Note.module.css'

const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  gap:'10px',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Note({ title, text, id, setNotes }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editNote, setEditNote] = useState({ title, text });

  const deleteHandler = async ({ id }) => {
    try {
      const response = await fetch(`http://localhost:3001/user/notes/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const result = await response.json();
      setNotes(result);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setEditNote((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/user/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editNote),
      });
      const result = await response.json();

      setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes];
        const noteIndex = updatedNotes.findIndex((note) => note.id === id);

        if (noteIndex !== -1) {
          updatedNotes[noteIndex] = result;
        }
        return updatedNotes;
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={style.cards}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small" onClick={handleOpen}>
          Edit
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className={style.formForEdit}
        >
          <Box sx={styles}>
            <form onSubmit={submitHandler}>
              <TextField
                onChange={inputHandler}
                id="filled-multiline-static"
                multiline
                maxRows={10}
                label="Title"
                variant="outlined"
                name="title"
                value={editNote.title}
                className={style.inputs}
              />
              <TextField
                onChange={inputHandler}
                id="outlined-textarea"
                multiline
                maxRows={10}
                label="Description"
                variant="outlined"
                name="text"
                value={editNote.text}
              />
              <Button variant="outlined" size="small" type="submit">
                Save
              </Button>
              <Button variant="outlined" size="small" type="button" onClick={handleClose}>
                Cancel
              </Button>
            </form>
          </Box>
        </Modal>
        <Button variant="outlined" size="small" onClick={() => deleteHandler({ id })}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

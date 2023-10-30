import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';

export default function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch('http://localhost:3001/user', {
          credentials: 'include',
        });

        const result = await response.json();
      } catch (error) {
        console.log(error);
      }
    }
    console.log(getUser());
  }, []);

  const logoutHandler = async () => {
    try {
      const response = await fetch('http://localhost:3001/user/logout', {
        credentials: 'include',
      });
      const result = await response.json();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.header}>
      <div className={style.link}>
        <Link to="/login">
          <img src="/img/login.png" alt="logout" width={40} />
          <p className={style.p}>Log In</p>
        </Link>
        <Link to="/notes">
          <img src="/img/list.png" alt="logout" width={40} />
          <p className={style.p}>List of notes</p>
        </Link>
        <Link to="/add">
          <img src="/img/addNote.png" alt="logout" width={40} />
          <p className={style.p}>Add a note</p>
        </Link>
        <Link to="/logout" onClick={() => logoutHandler()}>
          <img src="/img/logout.png" alt="logout" width={40} />
          <p className={style.p}>Logout</p>
        </Link>
      </div>
    </div>
  );
}

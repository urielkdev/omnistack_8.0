import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

import api from '../services/api';

import './Main.css';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import itsamatch from '../assets/itsamatch.png'

const Main = ({ match }) => {

  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  // get the user information
  useEffect(() => {
    const loadUsers = async () => {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id
        }
      });
      setUsers(response.data);
    }

    loadUsers();
  }, [match.params.id]);

  // connect to socket.io (realtime)
  useEffect(() => {
    const socket = io('http://localhost:3333', {
      query: { user: match.params.id }
    });

    socket.on('match', dev => {
      console.log(dev);
      setMatchDev(dev);
    })
  }, [match.params.id]);

  const handleLike = async (id) => {
    // header no metodo post é o terceiro parametro, e n o segundo como no get
    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: match.params.id
      }
    });

    setUsers(users.filter(user => user._id !== id))
  }

  const handleDislike = async (id) => {
    // header no metodo post é o terceiro parametro, e n o segundo como no get
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    });

    setUsers(users.filter(user => user._id !== id))
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0 ? (

        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <img src={user.avatar} alt="" />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons-container">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-container">Acabou :(</div>
      )}
      { matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="Its a match" />
          <img className="avatar" src={matchDev.avatar} alt="matched user image" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button onClick={() => setMatchDev(null)}>Fechar</button>
        </div>
      )}

    </div>
  );

}
export default Main;

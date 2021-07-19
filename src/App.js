import React from 'react';
import axios from 'axios';

import socket from './socket';

import reducer from './logic/reducer';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: '#f0f5f5',
    height: '100vh',
    width: '100%',
    padding: 0,
    margin: 0,
  },
}));


function App() {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  window.socket = socket;

  return (
    <div className={classes.wrapper}>
      {!state.joined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Chat {...state} onAddMessage={addMessage} />
      )}
    </div>
  );
}

export default App;

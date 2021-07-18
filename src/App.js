import React, {useReducer, useEffect} from 'react';
import {Login} from "./components/Login";
import {socket} from './socket'
import reducer from './reducer'
import {Chat} from "./components/Chat";



export const App = () => {
    const [state, dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
    });

    const onLogin = (obj) => {
        dispatch({
            type: 'JOINED',
            payload: obj,
        });
        socket.emit('ROOM:JOIN',  obj );
    }

    useEffect(() => {
        socket.on('ROOM:JOINED', users => {
            console.log('New user', users)
        });
    },[])

    return (
    <div>
        {!state.joined ? <Login onLogin={onLogin} /> : <Chat/>}
    </div>
  );
}


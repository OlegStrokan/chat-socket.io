import React, {useState} from 'react';
import socket from '../socket'
import axios from 'axios';

export const Login = ({ onLogin }) => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onEnter = async () => {
        if (!roomId || !userName)  {
           return alert('Data isn\'t correct!')
        }
        const obj = {
            roomId,
            userName,
        }
        setLoading(true)
        await axios.post('/rooms', {
            roomId,
            userName
        });
        onLogin(obj);
    }
    return (
        <div>
            <input type='text' placeholder='Room ID' value={roomId} onChange={(e) => setRoomId(e.target.value)}/>
            <input type='text' placeholder='Your name' value={userName} onChange={(e) => setUserName(e.target.value)}/>
            <button disabled={isLoading} onClick={onEnter}>Login</button>
            {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
        </div>
    );
};

import { io } from 'socket.io-client';

export const socket = io('http://localhost:7070',{
    autoConnect: false,
}) 
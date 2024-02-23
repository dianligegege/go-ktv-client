'use client';

import MessageList from "./MessageList"
import InputMessage from "./InputMessage"
import './style.scss';
import { useCallback, useEffect, useState } from "react";
import { PressEvent } from "@react-types/shared";
import { socketClient } from "@/lib/server/socketService";

// const messageList = [
//   { id: '1', content: 'Hello,dagwga, d dawdawdaw Hello,dagwga, d dawdawdawHello,dagwga, d dawdawdaw', sender: 'Logan', timestamp: 1876181212641, isMy: true },
// ];

const roomId = 'room1';
const userName = 'zl' + Math.random() * 1000;

const ChatArea = () => {
  const [messageList, setMessageList] = useState<any>([]);

  useEffect(() => {
    socketClient.connect('https://localhost:3001', {
      path: '/api/socket',
    });

    socketClient.on('connect', () => {
      joinRoom();
    });

    socketClient.on('message', (message: any) => {
      console.log('zl-message', message);
      setMessageList((val: any) => [
        ...val,
        {
          ...message,
          isMy: message.sender === userName,
        },
      ]);
      console.log('zl-messageList', messageList);
    })

    return () => {
      socketClient.disconnect();
      socketClient.off('connect');
      socketClient.off('message');
    }
  }, []);

  const joinRoom = () => {
    socketClient.emit('toJoin', {
      roomId,
      userName,
    });
  }

  return <>
    <MessageList messages={messageList} />
    <InputMessage roomId={roomId} userName={userName} />
  </>
}

export default ChatArea;

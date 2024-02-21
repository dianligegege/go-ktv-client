'use client'

import { useCallback, useEffect, useRef } from "react";
import io from 'socket.io-client';
import WebRTCClient from "../tools/WebRTCClient";

interface IProps {
  receiveMsg?: (msg: string) => void;
}

export function useCreateRtc({ receiveMsg }: IProps) {
  const pcLocal = useRef<WebRTCClient | null>(null);
  const pc = useRef<RTCPeerConnection | undefined>(undefined);
  const roomId = 'room1';
  const userName = 'zl' + Math.random() * 1000;

  const domain = 'https://localhost:3001';
  const socket = io(domain, {
    path: '/api/socket',
  });

  useEffect(() => {
    handleRtc();
    addSocketListener();
    return () => {
      socket.emit('toLeave', {
        roomId,
        userName,
      });
    }
  }, []);

  const sendMessage = useCallback((message: string) => {
    pcLocal.current?.sendMessage(message);
  }, []);

  const createChannel = useCallback(() => {
    pcLocal.current?.createDataChannel();
  }, []);

  const createOffer = useCallback(async () => {
    const offer = await pcLocal.current?.createOffer();
    console.log('zl-createOffer-offer', offer);
    socket.emit('toOffer', {
      roomId,
      userName,
      offer,
    });
    createChannel();
  }, [socket, roomId, userName, createChannel]);

  const handleRtc = useCallback(() => {
    pcLocal.current = new WebRTCClient({
      // onTrack(e) {
      //   if (e.streams.length > 0 && localVideo) {
      //     [localVideo.srcObject] = e.streams;
      //   }
      // },
      onDataChannel(e) {
        console.log('zl-onDataChannel', e);
      },
      onReceiveMessage(e) {
        receiveMsg?.(e.data);
      }
    });

    pc.current = pcLocal.current?.pc;

    pc.current?.addEventListener('icecandidate', async (e) => {
      if (e.candidate) {
        console.log('zl-icecandidate', e.candidate);
        socket.emit('toIce', {
          roomId,
          userName,
          type: 'ice',
          candidate: e.candidate,
        });
      }
    });

  }, [receiveMsg, socket, userName]);

  const addSocketListener = useCallback(() => {
    socket.on('connect', () => {
      console.log('zl-connect');
      socket.emit('toJoin', {
        roomId,
        userName,
      });
    });

    socket.on('message', (message) => {
      console.log('zl-message', message);
      // messages.value.push(message);
    });

    socket.on('leave', (data) => {
      console.log('zl-leave', data);
      // messages.value.push({
      //   id: Date.now(),
      //   sender: '系统消息',
      //   text: `${data.userName}离开了房间`,
      // });
    });

    socket.on('full', () => {
      alert('房间已满');
    });

    socket.on('ice', async (data) => {
      console.log('zl-receive-ice', data);
      pcLocal.current?.addIceCandidate(data.candidate);
    });

    socket.on('offer', async (data) => {
      console.log('zl-receive-offer', data);
      pcLocal.current?.saveRemoteDescription(data.offer);
      const answer = await pcLocal.current?.createAnswer();
      socket.emit('toAnswer', {
        roomId,
        userName,
        answer,
      });
    });

    socket.on('answer', async (data) => {
      console.log('zl-receive-answer', data);
      pcLocal.current?.saveRemoteDescription(data.answer);
    });
  }, [socket, userName]);

  // const createRtc = useCallback(() => {
  //   handleRtc();
  // }, [handleRtc]);

  return {
    // createRtc,
    createOffer,
    pcLocal,
    sendMessage,
  }
}
import { useCallback, useEffect } from 'react';
import { socketClient } from '@/lib/server/socketService';

function useSocket(url: { domain: string, option: object }, events: Record<string, (...args: any[]) => void> = {}) {
  useEffect(() => {
    console.log('zl-useEffect');
    socketClient.connect(url.domain, url.option);
    return () => {
      socketClient.disconnect();
    };
  }, [url]);

  // 处理接收到的事件
  useEffect(() => {
    Object.keys(events).forEach((event) => {
      socketClient.on(event, events[event]);
    });

    return () => {
      Object.keys(events).forEach((event) => {
        socketClient.off(event, events[event]);
      });
    };
  }, [events]);

  // 发起事件
  const emitEvent = useCallback((event: string, payload: any) => {
    socketClient.emit(event, payload);
  }, []);

  return {
    emitEvent,
  };
}

export default useSocket;
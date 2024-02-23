"use client"

import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useMessageShowType } from '@/lib/store';
import { Tabs, Tab } from "@nextui-org/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FolderUp } from "lucide-react"
import { getCache, setCache, CacheKey } from "@/lib/cache";
import { testApi, testApiPost } from '@/lib/server/default';
import useSocket from "@/lib/hooks/useSocket";
import { socketClient } from "@/lib/server/socketService";
import React from "react";

function InputMessage({ roomId, userName }: { roomId: string, userName: string }) {
  const setShowType = useMessageShowType((state: any) => state.setVal);
  const showType = useMessageShowType((state: any) => state.val);

  const [textVal, setTextVal] = useState('');

  const changeShowType = (val: any) => {
    setShowType(val);
    setCache({
      [CacheKey.MESSAGE_SHOW_TYPE]: val,
    })
  };

  useEffect(() => {
    const cacheVal = getCache(CacheKey.MESSAGE_SHOW_TYPE);
    if (cacheVal) {
      setShowType(cacheVal);
    }
  }, [setShowType]);


  const sendMessage = useCallback(async () => {
    const message = {
      id: Date.now(),
      sender: userName,
      content: textVal,
      roomId,
    };
    socketClient.emit('toMessage', message);
    setTextVal('');
  }, [roomId, textVal, userName]);

  const sendFile = useCallback(async () => {
    // console.log('sendFile');
    // const res = await testApiPost({ a: 1 });
    // console.log('zl-res', res);
  }, []);

  const handleKeyDown = useCallback((e: any) => {
    if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  return <>
    <div className="flex flex-wrap gap-4 items-center pt-3 pb-3">
      <Button size="sm" radius="sm" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onPress={sendMessage}>
        SEND
      </Button>
      <Button onClick={sendFile} size="sm" className="bg-default-100 w-7">
        <FolderUp size={20} ></FolderUp>
      </Button>
      <Tabs
        selectedKey={showType}
        onSelectionChange={changeShowType}
      >
        <Tab key='oneSide' title="one side">
        </Tab>
        <Tab key='twoSide' title="side by side">
        </Tab>
      </Tabs>

    </div>
    <Textarea
      placeholder="Enter to send, Shift+Enter to new line."
      value={textVal}
      onValueChange={setTextVal}
      onKeyDown={handleKeyDown}
      minRows={2}
      maxRows={4}
    // disableAutosize
    />
  </>
}

export default React.memo(InputMessage);

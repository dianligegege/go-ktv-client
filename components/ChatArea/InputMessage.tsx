"use client"

import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useMessageShowType } from '@/lib/store';
import { Tabs, Tab } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { FolderUp } from "lucide-react"
import { getCache, setCache, CacheKey } from "@/lib/cache";
import axios from 'axios';
import { testApi } from '@api/default';

export default function InputMessage() {
  const setShowType = useMessageShowType((state: any) => state.setVal);
  const showType = useMessageShowType((state: any) => state.val);

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
  }, []);

  const [textVal, setTextVal] = useState('');

  const sendMsg = useCallback(async () => {
    const res = await testApi();
    console.log('zl-res', res);
    console.log('sendMsg', textVal);
  }, [textVal]);

  const handleKeyDown = useCallback((e: any) => {
    if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  }, [sendMsg]);

  return <>
    <div className="flex flex-wrap gap-4 items-center pt-3 pb-3">
      <Button size="sm" radius="sm" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onPress={sendMsg}>
        SEND
      </Button>
      <Button size="sm" className="bg-default-100 w-7">
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
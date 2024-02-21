'use client';
import { Card } from "@nextui-org/react";
import { Cable } from "lucide-react"
import { useCallback } from "react";
import { useCreateRtc } from "@/lib/hooks/useCreateRtc";

export default function AddConnect() {

  console.log('zl-AddConnect');

  const receiveMsg = useCallback((msg: string) => {
    console.log('zl-msg', msg);
  }, [])

  const { createOffer, sendMessage } = useCreateRtc({
    receiveMsg
  });

  const clickConnect = useCallback(() => {
    console.log('connect');
    createOffer();
  }, [createOffer]);

  const sendMsg = () => {
    sendMessage("测试数据");
  }

  return (
    <div className="rounded-large h-[170px]">
      <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[200px] group h-[100%] cursor-pointer">
        <div className="w-[100%] h-[100%] bg-slate-300 hover:bg-slate-400 flex justify-center items-center transition-all" onClick={clickConnect}>
          <Cable size={30} className="text-slate-50" />
        </div>
      </Card>
      <button onClick={sendMsg}>fasong</button>
    </div>
  );
}
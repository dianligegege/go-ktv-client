"use client"

import { useMessageShowType } from "@/lib/store";
import { Avatar } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/react";
import React from "react";
import { iMessage } from './index';


const MessageItem = ({ message, twoSide }: { message: iMessage, twoSide: boolean }) => {
  const formattedDate = new Date(message.timestamp).toLocaleString();

  return (
    <div className={`flex gap-2 group mb-1 message-item ${message.isMy ? 'is-my' : ''} ${twoSide ? 'two-side' : ''}`}>
      <div className="item-left">
        <Avatar src={`https://i.pravatar.cc/150?u=${message.sender}`} name={message.sender} />
      </div >
      <div className="item-right flex justify-start flex-wrap">
        <div className="text-slate-400 item-right-label flex justify-start items-center w-[100%]">
          <span className="text-sm">{message.sender}</span>
          <span className="text-xs transition text-transparent group-hover:text-slate-400 ml-2 duration-300 ease-in-out	">{formattedDate}</span>
        </div>
        <div className="bg-slate-100 rounded-l-md rounded-r-lg py-2 px-3 mt-1 text-slate-600 message-content w-fit whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div >
  );
}

function MessageList({ messages }: { messages: iMessage[] }) {
  const showType = useMessageShowType((state: any) => state.val);

  console.log('zl-messages', messages);

  return (
    <ScrollShadow hideScrollBar className="flex flex-col gap-2 h-[80%] side-by-side pt-4" size={20} >
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} twoSide={showType === 'twoSide'} />
      ))}
    </ScrollShadow>
  );
}

export default MessageList;
import MessageList from "./MessageList"
import InputMessage from "./InputMessage"
import './style.scss';
import { useCallback } from "react";
import { PressEvent } from "@react-types/shared";

const messageList = [
  { id: '1', content: 'Hello,dagwga, d dawdawdaw Hello,dagwga, d dawdawdawHello,dagwga, d dawdawdaw', sender: 'Logan', timestamp: 1876181212641, isMy: true },
  { id: '2', content: 'Hi', sender: 'John', timestamp: 1478619313471, isMy: false },
  { id: '3', content: 'Hey', sender: 'Logan', timestamp: 1478614961941, isMy: true },
  { id: '1', content: 'Hello,dagwga, d dawdawdaw Hello,dagwga, d dawdawdawHello,dagwga, d dawdawdaw', sender: 'Logan', timestamp: 1876181212641, isMy: true },
  { id: '2', content: 'Hi', sender: 'John', timestamp: 1478619313471, isMy: false },
  { id: '3', content: 'Hey', sender: 'Logan', timestamp: 1478614961941, isMy: true },
  { id: '1', content: 'Hello,dagwga, d dawdawdaw Hello,dagwga, d dawdawdawHello,dagwga, d dawdawdaw', sender: 'Logan', timestamp: 1876181212641, isMy: true },
  { id: '2', content: 'Hi', sender: 'John', timestamp: 1478619313471, isMy: false },
  { id: '3', content: 'Hey', sender: 'Logan', timestamp: 1478614961941, isMy: true },
];

const ChatArea = () => {
  return <>
    <MessageList messages={messageList} />
    <InputMessage />
  </>
}

export default ChatArea;

"use client"

import { Avatar } from "@nextui-org/react";
import { Card, CardHeader, CardFooter } from "@nextui-org/react";
import { Button, ButtonGroup, Tooltip } from "@nextui-org/react";
import { Video, Headset, ScreenShare } from "lucide-react"

type Color = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;

export default function UserCard({ name = "John Doe", avatar, type = 'default', isMe }: { name: string, avatar?: string, type?: Color, isMe?: boolean }) {
  return <div className="rounded-large h-[170px]">
    <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[200px] group h-[100%]">
      <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 w-[100%] h-[100%] absolute" />
      <CardHeader className="h-40 flex-wrap justify-center content-center">
        <Avatar isBordered color={type} src={avatar} name={name} />
        <div className="w-[100%] text-center pt-3">{name}</div>
      </CardHeader>
      {
        !isMe && <CardFooter className="translate-y-16 group-hover:translate-y-0 justify-center overflow-hidden p-2 absolute rounded-large bottom-1 z-10 w-[100%] my-0 bg-transparent transition-all">
          <Tooltip content="Video chat" delay={800}>
            <Button isIconOnly className="w-9 h-9 mr-4 shadow-sm bg-slate-500" color="primary" aria-label="Video">
              <Video size={18} />
            </Button>
          </Tooltip>
          <Tooltip content="Voice chat" delay={800}>
            <Button isIconOnly className="w-9 h-9 shadow-sm bg-slate-500" color="primary" aria-label="voice chat">
              <Headset size={18} />
            </Button>
          </Tooltip>
          <Tooltip content="Shared screen" delay={800}>
            <Button isIconOnly className="w-9 h-9 ml-4 shadow-sm bg-slate-500" color="primary" aria-label="voice chat">
              <ScreenShare size={18} />
            </Button>
          </Tooltip>
        </CardFooter>
      }
    </Card>
  </div>

}
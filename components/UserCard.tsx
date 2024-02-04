"use client"

import { Avatar } from "@nextui-org/react";
import { Card, CardHeader } from "@nextui-org/react";

type Color = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;

export default function UserCard({ name = "John Doe", avatar, type = 'default' }: { name: string, avatar?: string, type?: Color }) {
  // return <div className="rounded-large bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
  return <div>
    <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 max-w-[200px] group">
      <CardHeader className="h-40 flex-wrap justify-center content-center">
        <Avatar isBordered color={type} src={avatar} name={name} />
        <div className="w-[100%] text-center pt-3">{name}</div>
      </CardHeader>
    </Card>
  </div>

}
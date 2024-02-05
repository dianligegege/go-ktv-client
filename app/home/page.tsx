"use client";

import UserCard from "@/components/UserCard";
import ChatArea from "@/components/ChatArea";
import { Card } from "@nextui-org/react";
import './style.scss';

export default function Page({ }: {}) {
  return (
    <div className="page-wrap h-[calc(100dvh-3.5rem)] px-8 pt-4 pb-8 grid gap-6">
      <aside>
        <UserCard type="success" name="Logan" avatar="https://i.pravatar.cc/150?u=a042581f4e29026704d" isMe={true} />
        <UserCard name="hh" />
      </aside>
      <main className="rounded-large h-[calc(100dvh-6.5rem)]">
        <Card isBlurred className="h-[100%] p-4">
          <ChatArea />
        </Card>
      </main>
    </div>
  );
}
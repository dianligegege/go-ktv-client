import UserArea from "@/components/UserArea";
import ChatArea from "@/components/ChatArea";
import { Card } from "@nextui-org/react";
import './style.scss';

export default function Page() {
  return (
    <div className="page-wrap h-[calc(100dvh-3.5rem)] px-8 pt-4 pb-8 grid gap-6">
      <aside>
        <UserArea></UserArea>
      </aside>
      <main className="rounded-large h-[calc(100dvh-6.5rem)]">
        <Card isBlurred className="h-[100%] p-4">
          <ChatArea />
        </Card>
      </main>
    </div>
  );
}
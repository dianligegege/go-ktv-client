import UserCard from "./UserCard";
import AddConnect from "./AddConnect";

export default function UserArea() {
  return (
    <div className="flex flex-col gap-4">
      <UserCard type="success" name="Logan" avatar="https://i.pravatar.cc/150?u=a042581f4e29026704d" isMe={true} />
      <UserCard name="hh" />
      <AddConnect />
    </div>
  );
}
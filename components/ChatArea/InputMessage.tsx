import { Textarea } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useMessageShowType } from '@/lib/store';
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { PressEvent } from "@react-types/shared";
import { useCallback, useState } from "react";
import { FolderUp } from "lucide-react"

export default function InputMessage() {
  const setShowType = useMessageShowType((state: any) => state.setShowType);
  const showType = useMessageShowType((state: any) => state.showType);

  const [textVal, setTextVal] = useState('');

  const sendMsg = useCallback(() => {
    console.log('sendMsg', textVal);
  }, [textVal]);

  const handleKeyDown = useCallback((e: any) => {
    if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
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
        onSelectionChange={setShowType}
      >
        <Tab key='oneSide' title="one side">
        </Tab>
        <Tab key='twoSide' title="side by side">
        </Tab>
      </Tabs>

    </div>
    <Textarea
      placeholder="Enter to send, Shift+Enter to new line"
      value={textVal}
      onValueChange={setTextVal}
      onKeyDown={handleKeyDown}
      minRows={3}
      maxRows={4}
    />
  </>
}
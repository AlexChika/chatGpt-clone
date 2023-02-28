import ChatInput from "../../../components/chat/ChatInput";
import ChatPage from "../../../components/chat/ChatPage";

type Props = {
  params: {
    id: string;
  };
};
const Chat = ({ params: { id } }: Props) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ChatPage chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
};

export default Chat;

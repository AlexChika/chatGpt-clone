import { PlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addChat } from "../../lib/firebase";

const NewChat = () => {
  const { data } = useSession();
  const router = useRouter();

  async function createNewChat() {
    const doc = await addChat(data?.user?.email!);
    router.push(`chat/${doc.id}`);
  }

  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
      <PlusIcon className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
};

export default NewChat;

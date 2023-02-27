import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { getMessageRef, removeChatDoc } from "../../lib/firebase";

type Props = {
  id: string;
};

const ChatRow = ({ id }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    query(getMessageRef(data?.user?.email!, id), orderBy("createdAt", "asc"))
  );

  async function removeChat() {
    await removeChatDoc(data?.user?.email!, id);
    router.replace("/");
  }

  useEffect(() => {
    if (!pathname) return;
    setActive(pathname.includes(id));
  }, [pathname]);

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <TrashIcon
        onClick={removeChat}
        className="h-5 w-5 text-gray-700 hover:text-red-700"
      />
    </Link>
  );
};

export default ChatRow;

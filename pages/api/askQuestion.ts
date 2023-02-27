import admin from "firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/api/query";
import { adminDb } from "../../lib/firebase/firebase-admin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "please provide a prompt" });
  }

  if (!chatId) {
    res.status(400).json({ answer: "please provide a valid chat ID" });
  }

  const response = await query(prompt, model);

  // USING FIREBASE ADMIN
  // I couldn't use the firebase admin to set the new message because the edge function times out at 10 sec

  const message: Message = {
    text: response!,
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "ChatGptIcon",
    },
  };

  try {
    await adminDb
      .collection("users") //user base collection
      .doc(session?.user?.email!)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);
    res.status(200).json({ answer: message.text });
  } catch (error) {
    res.status(500).json({ answer: "Firebase Error" });
  }
}

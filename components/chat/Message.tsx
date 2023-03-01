import { DocumentData } from "firebase/firestore";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ChatGptIcon } from "../../lib/icons";

type Props = {
  message: DocumentData;
  last: boolean;
  chatRef: MutableRefObject<HTMLDivElement | null>;
};

const Message = ({ message, last, chatRef }: Props) => {
  const isChatGpt = message.user.avatar === "ChatGptIcon";

  const textBoxRef = useRef<null | HTMLDivElement>(null);
  const [_message, setMessage] = useState("");

  useEffect(() => {
    if (!last) return;

    let text = message.text;

    function typeWriter() {
      let i = 0;
      let message = _message;

      function typing() {
        if (i < text.length) {
          setMessage((message += text.charAt(i)));
          i++;
          setTimeout(typing, 100);
        }
      }

      typing();
    }

    typeWriter();
  }, [last]);

  useEffect(() => {
    if (!last) return;
    if (textBoxRef.current) {
      if (chatRef.current) {
        chatRef.current.scrollTo(0, Number(chatRef.current.scrollHeight));
      }
    }
  }, [_message, last]);

  return (
    <div
      ref={textBoxRef}
      className={`py-7 text-white ${isChatGpt && "bg-[#434654]"}`}
    >
      <div className="flex px-3 sm:px-10 space-x-5 max-w-[700px] mx-auto">
        {isChatGpt ? (
          <span className="">
            <ChatGptIcon class="h-8 w-8" />
          </span>
        ) : (
          <>
            <img
              className="h-8 w-8"
              src={message.user.avatar}
              alt={message.user.name + "'s" + " avatar"}
            />
          </>
        )}

        {!last && (
          <div className="overflow-hidden">
            {message.text.split("\n").map((text: string, index: number) =>
              text ? (
                <p key={index} className="pb-3 text-sm message h-auto">
                  {text}
                </p>
              ) : (
                <></>
              )
            )}
          </div>
        )}

        {last && (
          <div className="overflow-hidden">
            {_message.split("\n").map((text: string, index: number) =>
              text ? (
                <p key={index} className="pb-3 text-sm message">
                  {text}

                  {_message.split("\n").length === index + 1 && (
                    <span className="h-5 blink w-5 bg-gray-400 translate-y-[3px]"></span>
                  )}
                </p>
              ) : (
                <></>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;

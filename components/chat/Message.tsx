import { DocumentData } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { ChatGptIcon } from "../../lib/icons";

type Props = {
  message: DocumentData;
  last: boolean;
};

const Message = ({ message, last }: Props) => {
  const isChatGpt = message.user.avatar === "ChatGptIcon";

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

  return (
    <div className={`py-5 text-white ${isChatGpt && "bg-[#434654]"}`}>
      <div className="flex px-5 sm:px-10 space-x-5 max-w-[700px] mx-auto">
        {isChatGpt ? (
          <>
            <span className="block min-w-8 min-h-8">
              <ChatGptIcon class="h-8 w-8" />
            </span>
          </>
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
          <span>
            {message.text.split("\n").map((text: string, index: number) =>
              text ? (
                <p key={index} className="pb-3 text-sm message">
                  {text}
                </p>
              ) : (
                <></>
              )
            )}
          </span>
        )}

        {last && (
          <span>
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
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;

import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../../../store/silce/user/user.thunk";
import { Input } from "@/components/ui/input"
import {
  getMessagesThunk,
  sendMessagesThunk,
} from "../../../store/silce/messages/messages.thunk";
import NavUserPathner from "./NavUserPathner";

const ChatUI = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const id = param.userId;

  const messageEndRef = useRef(null);
  const [chatPatnar, setChatPatnar] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  let receiverId = null;

  const { userProfile } = useSelector((state) => state.user);
  const { conversations, messages } = useSelector((state) => state.messages);
  // console.log(messages)
  const currentUserId = userProfile?.id;
  const crentConversationUserId = conversations.find((conv) => conv.id === id)
    ?.otherUser?.id;

  if (chatPatnar) {
    receiverId = id;
  } else {
    receiverId = crentConversationUserId;
  }

  const handleSendMessage = async () => {
    await dispatch(sendMessagesThunk({ receiverId, content: newMessage }));
    setNewMessage("");
  };

  useEffect(() => {
    (async () => {
      const respons = await dispatch(getUserThunk({ id }));
      setChatPatnar(respons.payload.User);
    })();
  }, [dispatch, id]);

  useEffect(() => {
    ( async () => {
      await dispatch(getMessagesThunk({ conversationId: id }));
    })()
  },[id]);

  useEffect(() => {
  if (messageEndRef.current) {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);


  // all clg here
  // console.log(messages);
  // console.log(crentConversationUserId);

  return (
    <div className="bg-[#F5F6FA] flex flex-col justify-between h-full overflow-y-auto">
      <div className=" bg-white w-full p-4 sm:p-6 flex items-center shadow-md">
        <NavUserPathner
          chatPatnar={chatPatnar}
          receiverId={receiverId}
          conversations={conversations}
        />
      </div>
      {/* Main Section */}
      <div className="w-full p-4 sm:p-6 flex flex-col items-center flex-grow">
        {/* Answer Section */}
        <div className="relative w-full max-w-[940px] flex items-start mt-6 space-x-2 sm:space-x-4">
          {/* Answer Logo (Outside Card) */}
          <div className="w-10 h-10 sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden shadow-md flex-shrink-0">
            <img
              src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRRy13MyeQ9a5Txx3-D8MG40xztFfUsI4lnvNU8LPxqARV8AANe"
              alt="Answer Logo"
              className="w-full h-full object-cover"
            />
          </div>
          {/* msg Card */}
          <div className="flex w-full flex-col gap-2 p-4" >
            {messages.map((msg) => {
              const isMe = msg.senderId === currentUserId;

              return (
                <div
                  id="chat-container"
                  ref={messageEndRef}
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      isMe
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Input and Button Section */}
      <div className="w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-[#F5F6FA] sticky bottom-0">
        <div className="flex flex-col sm:flex-row items-center w-full max-w-[900px] space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Input */}
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1  sm:h-[54px] rounded-full border border-gray-200 px-6  focus:outline-none focus:ring-2 focus:ring-[#6A5AE0] w-full"
          />
          {/* Submit Button */}

          <Button
            onClick={handleSendMessage}
            className="w-full sm:w-auto sm:px-8 sm:h-[54px] rounded-full text-white font-semibold shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)] hover:opacity-90 transition flex-shrink-0"
          >
            Send <Send className="h-5 w-5 mr-2" />
          </Button>
          {/* <button className="w-full sm:w-auto sm:px-8 sm:h-[54px] bg-gradient-to-r from-[#4A25E1] to-[#7B5AFF] rounded-full text-white font-semibold shadow-[0px_21px_27px_-10px_rgba(96,60,255,0.48)] hover:opacity-90 transition flex-shrink-0">
            Send
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ChatUI;

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LogOut, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import {
  getOtherUserThunk,
  logoutUserThunk,
} from "../../../store/silce/user/user.thunk";
import { getConversationThunk } from "../../../store/silce/messages/messages.thunk";
import { setOnlineUsers } from "../../../store/silce/sockit/sockit.silce";
import { setNewMessags } from "../../../store/silce/messages/messages.silce";

const Sidebar = ({ isOpen, setOpen }) => {
  const [otherUsename, setOtherUsename] = useState("");
  const [otherUser, setOtherUser] = useState(null);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  const { userProfile } = useSelector((state) => state.user);
  const { conversations } = useSelector((state) => state.messages);
  const { socket, onlineUsers} = useSelector((state) => state.sockit);

  const handleGetOtherUser = async () => {
    const otherProfile = await dispatch(getOtherUserThunk({ otherUsename }));
    setOtherUser(otherProfile.payload?.otherUser);
    console.log(otherProfile.payload)
  };

  useEffect(() => {
    (async () => {
      await dispatch(getConversationThunk({ loggedInUserId: userProfile?.id }));
    })();
  }, [dispatch, userProfile]);

  useEffect(() => {
    if (!socket) return;
    socket.on("online-users", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("new-message", (newmessage) => {
      dispatch(setNewMessags(newmessage))
      console.log(newmessage)
    });

    return () => {
      socket.off("online-users");
    };
  }, [dispatch, socket, userProfile]);



  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden",
          isOpen ? "block" : "hidden"
        )}
      ></div>

      {/* Sidebar */}
      <div
        className={cn(
          "w-[280px] h-full bg-white border-r px-3 py-4 flex flex-col fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img
              src={userProfile?.avatar}
              alt={userProfile?.username}
              className="w-7 h-7 rounded-full"
            />
            <h2 className="text-sm font-medium">{userProfile?.username}</h2>
          </div>
          <button onClick={() => setOpen(false)} className="md:hidden p-1">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="flex gap-2 justify-center items-center">
            <input
              value={otherUsename}
              onChange={(e) => setOtherUsename(e.target.value)}
              id="search"
              type="text"
              placeholder="Scarch..."
              className="w-[80%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              onClick={handleGetOtherUser}
              className=" px-3 py-2 cursor-pointer"
            >
              <Search />{" "}
            </Button>
          </div>
          {otherUser ? (
            <div className="mt-5 hover:bg-gray-200 px-5 py-2 rounded-2xl cursor-pointer">
              <div className="flex items-center gap-3">
                <Link
                  to={`/chat/${otherUser.id}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={otherUser.avatar}
                    alt={otherUser.name}
                    className="w-7 h-7 rounded-full"
                  />

                  <h2 className="text-sm font-medium">{otherUser.username}</h2>
                </Link>
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t">
              {conversations.map((conv) => (
                <Link
                  to={`/chat/${conv.id}`}
                  key={conv.id}
                  className="flex items-center p-2 gap-3 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => setOpen(false)} // Close sidebar on item click
                >
                  <div className="relative flex items-center gap-3">
                    <img
                      src={conv.otherUser.avatar}
                      alt={conv.otherUser.username}
                      className="w-8 h-8 rounded-full"
                    />
                    {onlineUsers?.includes(conv.otherUser.id) && (
                      <span className="absolute top-0 right- block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
                    )}
                    <h2 className="text-sm font-medium">
                      {conv.otherUser.username}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="space-y-1"></div>
        </nav>

        <div className="pt-4 border-t">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

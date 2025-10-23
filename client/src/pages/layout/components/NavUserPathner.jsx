import React from "react";

function NavUserPathner({ chatPatnar, conversations, receiverId }) {
  const otherUser = conversations.find(
    (conv) => conv.otherUser.id === receiverId
  )?.otherUser;
  // console.log(conversations.otherUser);
  // console.log(otherUser, receiverId);
  
  if (chatPatnar) {
    return (
      <div className="flex items-center gap-3 ml-14">
        <img
          src={chatPatnar?.avatar}
          alt={chatPatnar?.username}
          className="w-7 h-7 rounded-full"
        />
        <h2 className="text-sm font-medium">{chatPatnar?.username}</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 ml-14">
      <img
        src={otherUser?.avatar}
        alt={otherUser?.username}
        className="w-7 h-7 rounded-full"
      />
      <h2 className="text-sm font-medium">{otherUser?.username}</h2>
    </div>
  );
}

export default NavUserPathner;

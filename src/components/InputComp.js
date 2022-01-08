import { useEffect, useState } from "react";

const InputComp = ({
  socket,
  setShowChat,
  setChatHistory,
  setName,
  setRoom,
  room,
  name,
}) => {
  useEffect(() => {
    socket.on("get-history", (data) => {
      setChatHistory(data);
      console.log(data);
    });
    console.log("in effect");
  }, [socket]);

  const joinRoom = () => {
    const data = { name, room };
    socket.emit("join-chat-room", data);
    setShowChat(true);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter room name to join"
        onChange={(e) => {
          setRoom(e.target.value);
        }}
        onKeyPress={(e) => {
          e.key === "Enter" && joinRoom();
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default InputComp;

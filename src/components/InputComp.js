import { useEffect, useRef, useState } from "react";

const InputComp = ({
  socket,
  setShowChat,
  setChatHistory,
  setName,
  setRoom,
  room,
  name,
}) => {
  const nameInput = useRef();
  useEffect(() => {
    nameInput.current.focus();
  }, []);

  useEffect(() => {
    socket.on("get-history", (data) => {
      setChatHistory(data);
      console.log(data);
    });
    console.log("in effect");
  }, [socket]);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      const data = { name, room };
      socket.emit("join-chat-room", data);
      setShowChat(true);
    } else alert("something missing!");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        ref={nameInput}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onKeyPress={(e) => {
          e.key === "Enter" && joinRoom();
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

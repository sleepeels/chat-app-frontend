import "./App.css";
import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";
import InputComp from "./components/InputComp";

const socket = io.connect("http://localhost:5000");
// const socket = io.connect("http://https://simplestchatapp.herokuapp.com:5000");
// const socket = io.connect("http://192.168.1.17:5000");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [chatHistory, setChatHistory] = useState([]);

  const [showChat, setShowChat] = useState(false);

  return (
    <div className="main">
      <h1>Simplest Chat App</h1>
      <div>
        {!showChat ? (
          <InputComp
            socket={socket}
            setShowChat={setShowChat}
            setChatHistory={setChatHistory}
            setName={setName}
            setRoom={setRoom}
            name={name}
            room={room}
          />
        ) : (
          <Chat
            setShowChat={setShowChat}
            socket={socket}
            name={name}
            room={room}
            history={chatHistory}
          />
        )}
      </div>
    </div>
  );
}

export default App;

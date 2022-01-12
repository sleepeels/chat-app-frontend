import "./App.css";
import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";
import Welcome from "./components/Welcome";

// const socket = io.connect("http://localhost:5000");
const socket = io.connect("https://simplestchatapp.herokuapp.com");
// const socket = io.connect("http://192.168.1.17:5000");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [chatHistory, setChatHistory] = useState([]);

  const [showChat, setShowChat] = useState(false);

  return (
    <div className="main">
      <h1> !Simplest Chat App!</h1>
      <div>
        {!showChat ? (
          <Welcome
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

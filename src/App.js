import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import Chat from "./components/Chat";
import InputComp from "./components/InputComp";

const socket = io.connect("http://localhost:5000");

function App() {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  // const onTextChange = (e) => {
  //   console.log(nameIn.current.value);

  //   setState({ ...state, name: e.target.name, message: e.target.message });
  // };

  // const onMessageSubmit = (e) => {
  //   e.preventDefault();
  //   const { name, message } = chat;
  //   console.log(name, message);
  //   socket.emit("message", { name, message });
  //   setState({ message: "", name });
  // };

  const renderChat = () => {
    return chat.map((chat, index) => {
      return (
        <div key={index}>
          <h3>
            {chat.name}: <span>{chat.message}</span>
          </h3>
        </div>
      );
    });
  };

  return (
    <div className="card">
      <InputComp essence={"write a message"} />
      <InputComp essence={"choose name"} />
      <Chat socket={socket} />
      <div>
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;

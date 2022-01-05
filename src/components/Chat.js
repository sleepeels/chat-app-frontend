import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useEffect, useState } from "react";
// import io from "socket.io-client";

const Chat = ({ socket }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  // const [socket, setSocket] = useState("");

  // useEffect(() => {
  //   // const socket = io.connect("http://localhost:5000");
  //   setSocket(io.connect("http://localhost:5000"));
  // }, []);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { name, message });
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onMsgChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <h1>Chat</h1>
      <div id="chat-wrapper">
        <form id="chat-form" autoComplete="off" onSubmit={onMessageSubmit}>
          <TextField
            name="name"
            onChange={(e) => onNameChange(e)}
            value={name}
            label="Name"
          />
          <TextField
            name="message"
            onChange={(e) => onMsgChange(e)}
            value={message}
            label="Message"
          />
          <Button type="submit" variant="contained" color="Primary">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

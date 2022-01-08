import { useEffect, useState, useRef } from "react";

const Chat = ({ socket, name, room, history, setShowChat }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");

  const dummyDiv = useRef();
  const messageInput = useRef();

  useEffect(async () => {
    await setChatHistory(history);
    dummyDiv.current.scrollIntoView({ behavior: "smooth" });
    messageInput.current.focus();
  }, [history]);

  useEffect(() => {
    dummyDiv.current.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    socket.on("recieve-message", (data) => {
      setChatHistory((chatHistory) => [...chatHistory, data]);
      dummyDiv.current.scrollIntoView({ behavior: "smooth" });
    });
  }, [socket]);

  const closeSocket = () => {
    socket.disconnect(socket);
    setShowChat(false);
    window.location.reload();
  };

  const sendMessage = async () => {
    if (message !== "") {
      const data = {
        name: name,
        room: room,
        message: message,
        timestamp:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      setChatHistory((chatHistory) => [...chatHistory, data]);

      // console.time("sending msg");
      await socket.emit("send-message", data);
      // console.timeEnd("sending msg");

      setMessage("");
      dummyDiv.current.scrollIntoView({ behavior: "smooth" });
    } else alert("enter message");
  };

  const renderChatHistory = () => {
    return chatHistory.map((data, index) => {
      return (
        <div className={name === data.name ? "me" : "other"} key={index}>
          <h4 className="message">{data.message}</h4>
          <p className="details">
            {name === data.name ? "me" : data.name} | {data.timestamp}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="chat">
      <div className="chat-history">
        {renderChatHistory()}
        <div ref={dummyDiv}></div>
      </div>
      <div className="chat-inputs">
        <input
          type="text"
          value={message}
          placeholder={`${name}, write a message`}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
          ref={messageInput}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={closeSocket}>Logout</button>
      </div>
    </div>
  );
};

export default Chat;

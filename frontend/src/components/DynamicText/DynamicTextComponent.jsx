import React, { useEffect, useState } from "react";
import io from "socket.io-client";
var socket;
const ENDPOINT = "http://localhost:8000";

const DynamicTextComponent = ({quizId}) => {
  const [textValue, setTextValue] = useState("");

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
    socket.emit('send message', { room: quizId, message: event.target.value, senderType: 'admin' });
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join quiz", quizId);
    console.log(socket);

  }, []);


  return (
    <div>
      <input
        type="text"
        value={textValue}
        onChange={handleTextChange}
        placeholder="Type something..."
      />
      <p>{textValue && `You entered: ${textValue}`}</p>
    </div>
  );
};

export default DynamicTextComponent;

import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "./firebase";
import "./SidebarChat.css";
import AddCommentIcon from '@material-ui/icons/AddComment';

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  //runs when the id changes. Gets all the messages.
  useEffect(() => {
    // if ID exists
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  // runs code when component loads
  //   generating a new seed for every time component loads. Used to display new images.
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  // createChat prompts user for name and adds new chat with that name to the database.
  const createChat = () => {
    const roomName = prompt("Please enter a name for the chat");
    if (roomName) {
      // finding collections of rooms and adding the value we took in through the prompt
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  // if not new chat passed in value, show chats with messages else display add new chat.
  return !addNewChat ? (
    //Create dynamic url to room with that id.
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        {/* We give a new seed to the room each time generating a new icon */}
        <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg?m=7&b=%23fefefe`} />
        <div className="sidebarChat__info">
          <h3>{name}</h3>
          {/* Sets message to the last message sent. index 0 because its sorted as descending when fetched. */}
          <p> {[messages[0]?.message]}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat addchat">
      <AddCommentIcon />
      <h2> Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;

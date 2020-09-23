import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  //use state returns a pair, in the first parameter the variable and a setter for it in the second. What we put in the usestate() is the initial value.
  // in this case we declare rooms and set the array to be initially empty.
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  //   the empty array at the end only tells it to run once and once only
  useEffect(() => {
    //   go to the rooms collection, take a snapshot of whats in db. Everytime its changed takes a new snapshot and updates everything. we set the rooms by going through snapshot.docs (docs is reffering to list of elements in database). For every doc we return an object with doc id and doc data.
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
    //Empty array here
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {/* using "?" to catch error in case image doesnt exist. without the ? will throw an error and crash.  */}
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

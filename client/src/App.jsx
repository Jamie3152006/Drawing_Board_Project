import { useState } from "react";
import { useEffect } from "react";
import { socket } from "./socket";
import Toolbar from "./ToolBar";
import Canvas from "./Canvas";
import './App.css';

export default function App() {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(4);
  const [tool, setTool] = useState("pen");
  const [userCount, setUserCount] = useState(0);


  // The server sends "clear" back to everyone, including us
  const handleClear = () => socket.emit("clear");


  useEffect(() => {
    //client telling server we joined
    socket.on("users", setUserCount);
    //checking the server to see if others have joined
    socket.emit("getUsers");
    return() => socket.off("users", setUserCount);
  }, []);
  
  return (
    <main className="drawing-body">
      <h1>Shared Drawing Board</h1>
      <p>🟢 {userCount} online</p>
      <Toolbar
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
        onClear={handleClear}
        tool = {tool}
        setTool = {setTool}
      />
      <Canvas tool={tool} color={color} size={size} />
    </main>
  );
}
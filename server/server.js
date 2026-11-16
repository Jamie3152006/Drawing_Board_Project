import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

//creating our sever and our socket connection
const app = express(); //create an express {node server}
app.use(cors()); //telling our server to allow cross-origin requests
const server = createServer(app);
const io = new Server(server, { cors: {origin: '*'}}); //creates socket connection
const PORT = process.env.PORT || 3000;


//listening event for when someone else draws on our canvas

//broadcast event for when I draw on our canvas
//on connection means only execute code when someone is connected
io.on("connection", (socket) => {
  socket.on("draw", (line) => {
    socket.broadcast.emit("draw", line);
  });


  io.emit("users", io.engine.clientsCount);

  socket.on("getUsers", () => {
    io.emit("users", io.engine.clientsCount);
  });

  socket.on("disconnect", () => {
  io.emit("users", io.engine.clientsCount); // someone left
  });

//clear or erase function
   socket.on("clear", () => {
        io.emit("clear");
    });
});

//tell our server to listen to our localhost:3000
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
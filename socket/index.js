    const io = require("socket.io")(8900, {
        cors: {
            origin: "http://localhost:3000",
        },
    });

    let users = [];


    const addUser = (userId, socketId) => {
        !users.some(user => user.userId === userId) &&
            users.push({ userId, socketId });
    };


    //remveuser
    const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
    };

    const getUser = (userId) => {
        return users.find((user) => user.userId === userId);
      };




    io.on("connection", (socket) => {

        //when connect
        console.log("a user connected.");
        //take userId and SocketId from user
        socket.on('adduser', (userId) => {
            addUser(userId, socket.id)
            io.emit("getUsers", users);
        })



        //send and get message
        socket.on("sendMessage", ({ senderId, receiverId, text }) => {
            console.log("im 1",senderId);
            console.log("im 2",receiverId);
            console.log("im 3",text);
            const user = getUser(receiverId)
            io.to(user?.socketId).emit("getMessage",{
                senderId,
                text,
            })
        })


        //when disconnect
        socket.on("disconnect", () => {
            console.log("a user disconnected!");
            removeUser(socket.id);
            io.emit("getUsers", users);
        });

    })
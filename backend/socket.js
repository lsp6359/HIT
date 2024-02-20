const SocketIO = require("socket.io");

module.exports = (server) => {
    const io = SocketIO(server, { 
        path: "/socket.io",
        cors:{                              //socket 사용시에 CORS 허용 설정
            origin:'http://localhost:8080',
            method:["GET","PUT","POST"],
            credentials:true
        }
    });

    io.on("connection", (socket) => {       //io.sockets.on과 동일
        const req = socket.request;
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        console.log(
            `New Client : ${ip}, socket.id : ${socket.id}`
        );

        // 소켓 통신을 위한 소켓을 전역적으로 쓸 수 있도록 정의
        global.$socket = socket;

        socket.on("disconnect", () => {
            console.log(`Client Out : ${ip}, socket.id : ${socket.id}`);
            clearInterval(socket.interval);
        });

        socket.on("error", (error) => { });

        socket.on("from client", (data) => { // 클라이언트가 넘긴 데이터
            console.log(data);
        });

        socket.interval = setInterval(() => { // send 대신 emit으로 메세지를 보냄
            socket.emit("from server", "Message From Server");
        }, 3000);
    });
};
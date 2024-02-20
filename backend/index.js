const http = require('http');   // socket.io 서버를 올리기 위해 필요

const multer = require('multer'); // 이미지, 동영상 등 업로드 시 필요
const path = require('path');


const express = require('express');
const cors = require('cors');
//const socketio = require('socket.io');
const app = express();      //express app 생성
const webSocket = require('./socket.js');

//---------------------
// 이미지를 저장할 폴더 설정
const uploadDir = path.join(__dirname, 'CaptureImg');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now(); // 타임스탬프를 이용하여 파일 이름 생성
        const extension = path.extname(file.originalname); // 원본 파일의 확장자를 가져옴
        const filename = `captured_image_${timestamp}${extension}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

//---------------------
app.use(express.json());  //json 형식 파싱하기

app.use(express.static('public')); //클라이언트에게 정적 파일(이미지, CSS, JavaScript 파일 등)을 제공할 때 사용,
//클라이언트에서 요청한 파일을 서버에서 제공할 수 있게 됩니다.

// 이미지 업로드 처리
app.post('/upload', upload.single('image'), (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // Vue.js 애플리케이션의 주소로 변경
    res.header('Access-Control-Allow-Credentials', true);
    console.log('Image uploaded successfully');
    res.status(200).send('Image uploaded successfully');
});





// app.use(cors({
//     origin: 'http://localhost:8080',  //oring:'*'은 모두 다 허용인데 쿠키쓰려면 명확히 지정해줘야함
//     credentials: true, // true로 설정되어 있으면, 브라우저는 요청 시 쿠키 및 HTTP 인증과 같은 자격 증명 정보를 함께 보낼 것이고, 서버는 이를 받아들일 것이다.
//     // false이면 브라우저는 자격 증명 정보를 요청에 포함시키지 않는다.
//     //얘를 true로 하면oring을 특정해줘야함
//     optionsSuccessStatus: 200,
// })); //cors 적용

app.use(cors({
    origin: 'http://localhost:8080', // Vue.js 애플리케이션의 주소로 변경
    credentials: true,
    optionsSuccessStatus: 200,
}));

const dbconfig = require("./db.js");
const mongoose = require('mongoose');
//데이터베이스 연결 및 상태 로깅
mongoose.connect(dbconfig.url, { useNewUrlParser: true })
    .then(() => {
        console.log("정상적으로 MongoDB 서버에 연결되었습니다.");
    }).catch(err => {
        console.log("MongoDB에 연결되지 않았습니다.", err);
    });

require('./passport-session.js')(app);

app.get('/', (req, res) => {
    //console.log(req);
    res.json({ "message": "여러분들을 환영합니다." });
})

require('./router.js')(app);
var port = process.env.PORT || 8000;  //서버 포트(port) 설정

//클라이언트로부터 요청 듣기
const server = app.listen(port, () => {
    console.log(port, '번 포트에서 서버 실행 중 ..')
});
webSocket(server); // ws와 http 포트 공유

/*
const io = socketio(httpServer,{
    cors:{                              //socket 사용시에 CORS 허용 설정
        origin:'*',
        method:["GET","PUT","POST"]
    }
});
io.sockets.on('connection',function(socket){
    // 소켓 통신을 위한 소켓을 전역적으로 쓸 수 있도록 정의
    global.$socket = socket;
    // 소켓 이벤트 처리
    socket.on('rint',function(data){
        console.log('Client Data:',data);
    })
});
*/

import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';

const app = express();
const server = createServer(app);

const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// urlencoded 해주는 옵션
// extended : true는 라이브러리를 쓸 때
// extended : false는 라이브러리를 안 쓸 때

initSocket(server);

server.listen(PORT, () => {
  console.log(PORT + '포트로 서버가 열렸습니다.');
});

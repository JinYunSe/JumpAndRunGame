import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets } from './init/assets.js';

const app = express();
const server = createServer(app);

const PORT = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// urlencoded 해주는 옵션
// extended : true는 라이브러리를 쓸 때
// extended : false는 라이브러리를 안 쓸 때
app.use(express.static('public'));

initSocket(server);

server.listen(PORT, async () => {
  console.log(PORT + '포트로 서버가 열렸습니다.');

  try {
    const assets = await loadGameAssets();
    console.log(assets);
    console.log('Assets loaded Successfull');
  } catch (error) {
    console.error('Failed to load game assets : ', error);
  }
  // assets의 병렬 처리에서 파일 읽기를 실패할 경우
  // try-catch 문으로 상위 함수(현재 여기)에 던져줬기 때문에
  // console.error()로 그냥 게임 assets들을 가져오는걸 실패했다
  // 문구로 띄워줍니다.
});

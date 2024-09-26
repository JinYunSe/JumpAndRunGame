import { Server as SocketIO } from 'socket.io';
//as를 통해 Server를 SocketIO라는 이름으로
//개발자가 사용할 수 있게 바꿔줍니다.

const initSocket = (server) => {
  const io = new SocketIO();
  // 소켓 IO 객체를 생성하고
  io.attach(server);
  //io.attach라는 메서드를 사용해 server에 연결해줍니다.
};

export default initSocket;
// 서버는 app.js에 만든 server를 넣어줄거라
// export default로 외부 스크립트에서
// 사용할 수 있게 해줍니다.

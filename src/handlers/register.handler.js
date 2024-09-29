import { addUser } from '../models/user.model.js';
import { v4 as uuid } from 'uuid';
import { handleDisconnect, handleConnection, handlerEvent } from './helper.js';

const registerHandler = (io) => {
  io.on('connection', (socket) => {
    // 최초 커넥션을 맺은 이후 발생하는 각종 이벤트를 처리하는 곳

    const userUUID = uuid();
    // v4 메서드를 바탕으로 uuid를 생성 및 담아준다.
    addUser({ uuid: userUUID, socketId: socket.id });
    // socketId는 socket.id로 받아온다.

    //이 시점이 현재 유저가 막 접속을 했을 시점 입니다.
    handleConnection(socket, userUUID);

    socket.on('event', (data) => handlerEvent(io, socket, data));

    //접속 해제시 이벤트
    socket.on('disconnect', (socket) => handleDisconnect(socket, userUUID));
  });
  // io.on을 사용하면 'connection'이 발생할 때 까지
  // 소켓 객체가 대기하겠다는 의미
};

export default registerHandler;

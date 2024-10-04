import { getUser, removeUser } from '../models/user.model.js';
import handlerMappings from './handlerMapping.js';
import { CLIENT_VERSION } from '../constants.js';
import { createStage } from '../models/stage.model.js';
import { createUnlockItem } from '../models/item.unlock.model.js';

const handleConnection = (socket, userUUID) => {
  console.log(`New user connected ${userUUID} with socket Id ${socket.id}`);
  console.log('Current users : ', getUser());

  createStage(userUUID);
  createUnlockItem(userUUID);

  socket.emit('connection', { userUUID });
  //소켓을 가지고 있는 유저 본인에게 정보를 보내줍니다.
};

const handleDisconnect = (socket, userUUID) => {
  removeUser(socket.id);
  console.log(`User disconnected : ${socket.id}`);
  console.log(`Current users : `, getUser());
};

const handlerEvent = (io, socket, data) => {
  if (!CLIENT_VERSION.includes(data.clientVersion)) {
    //버전에 포함되지 않은 버전을 들고 있는 클라이언트
    socket.emit('response', { status: 'fail', message: 'Client Version MisMatch' });
    // http의 response와 다르다(우리가 임의로 정한 이름)
    return;
  }
  // 클라이언트 버전에 포함되지 않은 버전이라면
  // 접근 불가능을 알려줍니다.

  const handler = handlerMappings[data.handlerId];
  //handlerMappings[data.handlerId](필수)로
  if (!handler) {
    socket.emit('response', { status: 'fail', message: 'Handler Not Found' });
    return;
  }
  // handler를 찾지 못 했을 경우 오류 메시지 전송

  // handler를 찾았다면 handler를 실행시킵니다.
  const response = handler(data.userId, data.payload);
  // 이때, 매개변수로 받은 userId와 payload는 필수적으로 필요합니다.
  console.log('확인 : ', response);
  if (response.broadcast) {
    io.emit('response', 'broadcast');
    return;
  }
  // response가 한 Clinet에게가 아닌
  // 여러 유저에게 메시지나 결과를 제공해야한다면
  // 위와 같이 broadcast를 사용하면 됩니다.

  socket.emit('response', response);
  // stageHandler라 가정하에
  // const moveStageHandler = (uuid, payload) => {
  //   return { status: 'success' };
  // };
  // 위의 Handler가 동작하게 돼
  // { status : 'success'} Clinet에게 제공될 것 입니다.
};
// 핸들러를 맵핑하는 객체를 생성했으니 사용을 할 곳이 있어야합니다.
// 유저의 모든 메세지를 받아 적절한 핸들러로 보내주는 이벤트 핸들러를 만들어봅시다.
export { handleDisconnect, handleConnection, handlerEvent };

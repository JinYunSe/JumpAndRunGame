import { CLIENT_VERSION } from './Constants.js';
// import로 CLIENT_VERSION을 가져옵니다.

const socket = io('http://localhost:3030', {
  // socket으로 위의 주소로 연결하겠다는 것을 명시적으로 작성합니다.
  query: {
    clientVersion: CLIENT_VERSION,
  },
  // Data에 payload로 Client의 Version을 서버에 보내줍니다.
});

let userId = null;
// userId를 기본적으로 null로 설정합니다.
socket.on('response', (data) => {
  //response는 로직이 끝났을 때
  //response로 메시지를 전달해줍니다.
  console.log(data);
});

socket.on('connection', (data) => {
  //서버에서 connection이라는 이벤트가 발생할 때,
  //client에서 connection으로 메시지를 받습니다.
  console.log('connection', data);
  console.log(data.uuid);
  userId = data.uuid;
  // 서버에서 제공한 uuid를 userId에 저장합니다.
});

const sendEvent = (handlerId, payload) => {
  //event라는 이름으로 메시지를 보내고
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    // handlerId 통해 어떤 handler에서
    // 처리가 될지 결정해줍니다.
    payload,
  });
};

export { sendEvent };

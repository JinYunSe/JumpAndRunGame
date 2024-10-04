import { moveStageHandler } from './stage.handler.js';
import { gameStartHandler, gameEndHandler } from './game.handler.js';
import { itemUnlockHandler } from './item.unlock.handler.js';
import { itemHandler } from './item.handler.js';
const handlerMappings = {
  2: gameStartHandler,
  3: gameEndHandler,
  11: moveStageHandler,
  101: itemUnlockHandler,
  201: itemHandler,
};
// 이벤트에 따른 호출돼야 하는 핸들러 호출을 위한
// 핸들러 모음

// 앞으로 11번을 호출하면 stage와 관련된 handler가 호출된다.
// 앞으로 2번을 호출하면 game 시작과 관련된 handler가 호출된다.
// 앞으로 3번을 호출하면 game 끝내기와 관련된 handler가 호출된다.
export default handlerMappings;

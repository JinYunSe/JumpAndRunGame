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

// 2번은 게임 시작 핸들러
// 3번은 게임 종료 핸들러
// 11번은 스테이지 이동 핸들러
// 101번은 스테이지 별 아이템 언락 핸들러
// 201번은 유저가 먹은 아이템 저장 핸들러

export default handlerMappings;

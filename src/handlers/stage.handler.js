import { getStage, setStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';
import { getUserItem } from '../models/item.model.js';
import ServerTime from '../models/servertime.model.js';

const moveStageHandler = (userId, payload) => {
  const { stages } = getGameAssets();
  const { currentStage, targetStage } = payload;

  // 유저의 현재 스테이지 정보를 가져온다.
  let currentStages = getStage(userId);
  if (!currentStages.length) {
    return { status: 'fail', message: 'No Stages Found For User' };
  }

  // 오름차순 -> 유저의 진행한 가장 큰 스테이지 ID를 확인
  currentStages.sort((a, b) => a.id - b.id);

  const playerStage = currentStages[currentStages.length - 1];
  // 서버가 아는 현재 유저 스테이지 가져오기

  // 서버(currentStage)   VS   클라이언트(payload.currendStage) 비교
  if (playerStage.id !== currentStage.id)
    return { status: 'fail', message: 'Current Stage Mismatch' };

  const serverTime = Date.now(); // 현재 타임스탬프
  const elapsedTime = ((serverTime - playerStage.timestamp) / 1000) * playerStage.scorePerSecond;
  // ((현재 시간 - 스테이지 시작 시간) / 1000) * 시간 당 점수
  // 로 서버가 아는 유저 점수 구현

  const userEatedItem = getUserItem(userId).reduce((acc, cur) => {
    return (acc += cur);
  }, 0);

  console.log('유저가 먹은 아이템 점수 합 : ', userEatedItem);

  if (elapsedTime > 105 + userEatedItem) {
    return { status: 'fail', message: 'Invalid elapsed time' };
  }
  // 오차 범위

  if (!stages.data.some((stage) => stage.id === targetStage.id))
    return { status: 'fail', message: 'Target Stage Not Found' };
  // 스테이지 유무 확인

  setStage(userId, targetStage, serverTime);

  console.log('Stage : ', getStage(userId));
  return { status: 'success' };
};

export { moveStageHandler };

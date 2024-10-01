import { getStage, setStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';

const moveStageHandler = (userId, payload) => {
  const { stages } = getGameAssets();
  const { currentStage, targetStage } = payload;

  console.log(currentStage.id + ', ' + targetStage.id);

  // 유저의 현재 스테이지 정보를 가져온다.
  let currentStages = getStage(userId);
  if (!currentStages.length) {
    return { status: 'fail', message: 'No Stages Found For User' };
  }

  // 오름차순 -> 유저의 진행한 가장 큰 스테이지 ID를 확인
  currentStages.sort((a, b) => a.id - b.id);

  const maximumStage = currentStages[currentStages.length - 1];
  // 서버가 아는 현재 유저 스테이지 가져오기

  // 서버(currentStage)   VS   클라이언트(payload.currendStage) 비교
  if (maximumStage.id !== currentStage.id)
    return { status: 'fail', message: 'Current Stage Mismatch' };

  const serverTime = Date.now(); // 현재 타임스탬프
  const elapsedTime = ((serverTime - maximumStage.timestamp) / 1000) * maximumStage.scorePerSecond;
  // ((현재 시간 - 스테이지 시작 시간) / 1000) * 시간 당 점수
  // 로 서버가 아는 유저 점수 구현

  console.log('서버가 계산한 시간 : ', elapsedTime);
  if (elapsedTime < 99.5 || elapsedTime > 100.5) {
    return { status: 'fail', message: 'Invalid elapsed time' };
  }
  // 오차 점위

  if (!stages.data.some((stage) => stage.id === targetStage.id))
    return { status: 'fail', message: 'Target Stage Not Found' };
  // 스테이지 유무 확인

  setStage(userId, targetStage, serverTime);
  return { status: 'success' };
};

export { moveStageHandler };

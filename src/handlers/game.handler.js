import { getGameAssets } from '../init/assets.js';
import { setStage, getStage, clearStage } from '../models/stage.model.js';
import { setUnlockItem, getUnlockItem, clearUnlockItem } from '../models/item.unlock.model.js';
import { clearUserItem, getUserItem } from '../models/item.model.js';
// 게임 다시 시작 단계
const gameStartHandler = (uuid, payload) => {
  const { stages } = getGameAssets();
  // 게임 시작, 재시작이라

  // 서버가 알고 있는 유저 스테이지 초기화
  clearStage(uuid);
  // 서버가 알고 있는 유저 아이템 언락 초기화
  clearUnlockItem(uuid);
  // 서버가 알고 있는 유저가 먹은 아이템 초기화
  clearUserItem(uuid);

  const data = stages.data[0];

  // 유저의 1스테이지 정보를 서버가 알 수 있도록 등록
  setStage(uuid, data, payload.timestamp);
  // 유저의 1스테이지를 언락 정보 서버가 알 수 있도록 등록
  setUnlockItem(uuid, data.id);

  // 서버에서 유저의 1 스테이지 정보 확인해보기
  console.log('Stage : ', getStage(uuid));

  // 서버에서 유저의 1 스테이지 언락 아이템 확인해보기
  console.log('ItemUnlockItem : ', getUnlockItem(uuid));

  return { status: 'success' };
};
// 현재 어떠한 로직도 없기 때문에 무조건 성공으로 처리한다.

// 과제 : item.json 파일에
// stage.json 파일에 "scorePerSecond" : 1 ~ 10 방식으로 스테이지 당 점수 주기
const gameEndHandler = (uuid, payload) => {
  // 클라이언트에서 받은 게임 종료 시 타임스탬프와 총 점수
  const { timestamp: gameEndTime, score } = payload;
  const stages = getStage(uuid);

  if (!stages.length) {
    return { status: 'fail', message: 'No stages found for user' };
  }

  // 각 스테이지의 지속 시간을 계산하여 총 점수 계산
  let totalScore = 0;
  stages.forEach((stage, index) => {
    let stageEndTime;
    if (index === stages.length - 1) {
      // 마지막 스테이지의 경우 종료 시간이 게임의 종료 시간
      stageEndTime = gameEndTime;
    } else {
      // 다음 스테이지의 시작 시간을 현재 스테이지의 종료 시간으로 사용
      stageEndTime = stages[index + 1].timestamp;
    }
    const stageDuration = (stageEndTime - stage.timestamp) / 1000; // 스테이지 지속 시간 (초 단위)
    totalScore += stageDuration; // 1초당 1점
  });

  // 점수와 타임스탬프 검증 (예: 클라이언트가 보낸 총점과 계산된 총점 비교)
  // 오차범위 5
  if (Math.abs(score - totalScore) > 5) {
    return { status: 'fail', message: 'Score verification failed' };
  }

  // 모든 검증이 통과된 후, 클라이언트에서 제공한 점수 저장하는 로직
  // saveGameResult(userId, clientScore, gameEndTime);
  // 검증이 통과되면 게임 종료 처리
  return { status: 'success', message: 'Game ended successfully', score };
};
// 현재 어떠한 로직도 없기 때문에 무조건 성공으로 처리한다.

export { gameStartHandler, gameEndHandler };
// gameStart handler와 gameEnd handler를
// handlerMapping에 추가해줍니다.

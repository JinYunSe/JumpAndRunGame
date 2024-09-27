import { status } from 'init';
import { getStage } from '../models/stage.model.js';

const gameStartHandler = (uuid, payload) => {
  const { stages } = getGameAssets();
  // stages 배열에서 0번 째 = 첫 번째 스테이지
  setStage(uuid, stages.data[0].stage_id, payload.timestemp);
  // 클라이언트에서 시작하는 시간을 받아서 저장해줄겁니다.
  // => payload.timestemp
  console.log('Stage : ' + getStage(uuid));
  return { status: 'success' };
};
// 현재 어떠한 로직도 없기 때문에 무조건 성공으로 처리한다.

// 과제 : item.json 파일에
// stage.json 파일에 "scorePerSecond" : 1 ~ 10등 방식으로 스테이지 당 점수 주기
const gameEndHandler = (uuid, payload) => {
  // 클라이언트는 서버로 게임 종료 시점과 타임스탬프와 총 점수를 줄 것 입니다.

  const { timestemp: gameEndTime, score } = payload;
  // gameEndTime을 호출하면 key에 따른 value가 나오는데
  // 이 value를 timestemp라는 새로운 key에 제공해줍니다.

  const stages = getStage(uuid);

  if (!stages.length) return { status: 'fail', message: 'No Stages Found For User' };

  // 각 스테이지의 지속 시간을 계산하여 총 점수 계산
  let totalScore = 0;

  stages.forEach((stages, index) => {
    let stageEndTime;
    if (index === stages.length - 1) {
      // 마지막 스테이지의 경우 종료 시간이 종료 시간
      stageEndTime = gameEndTime;
    } else {
      // 다음 스테이지의 시작 시간을 현재 스테이지의 종료 시간으로 사용
      stageEndTime = stages[index + 1].timestemp;
    }
    const stageDuration = (stageEndTime - stages.timestemp) / 1000;
    // 현재는 1초당 1점씩만 제공되는 중
    totalScore += stageDuration;
  });

  // 점수와 타임 스탬프 검증 (예 : 클라이언트가 보낸 총점과 계산된 총점 비교)
  // 오차범위 5
  if (Math.abs(score - totalScore) > 5) {
    return { status: 'fail', message: 'Score Verification failed' };
  }

  // 모든 검증이 통과된 후, 클라이언트에서 제공한 점수 저장하는 로직
  // saveGameResult(userId, clientScore,gameEndTime)
  // 검증이 통과되면 게임 종료 처리

  // DB 저장한다고 가정을 한다면,
  // 저장
  // setResult(userId, score, timestamp)

  return { status: 'success', message: 'Game Ended', score };
};
// 현재 어떠한 로직도 없기 때문에 무조건 성공으로 처리한다.

export { gameStartHandler, gameEndHandler };
// gameStart handler와 gameEnd handler를
// handlerMapping에 추가해줍니다.

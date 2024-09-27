import { getStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';
import { status } from 'init';

const moveStageHandler = (uuid, payload) => {
  // 유저는 스테이지를 하나 씩 올라갈 수 있다.
  // (1 -> 2, 2-> 3)
  // 유저는 일정 점수가 되면 다음 스테이지로 이동한다.

  //매개변수로 받은 payload에서는
  //const {currentStage, targetStage} = payload로 제공됩니다.

  // 유저의 현재 스테이지 정보를 가져온다.
  let currentStages = getStage(uuid);
  if (!currentStages.length) {
    return { status: 'fail', message: 'No Stages Found For User' };
  }

  // 오름차순 -> 유저의 현재 스테이지 가장 큰 스테이지 ID를 확인
  currentStages.sort((a, b) => a.id - b.id);
  // 현재 스테이지 id가 올라 갈수록 높은 단계 입니다.

  const currentStage = currentStages[currentStages.length - 1];

  // 클라이언트 VS 서버 비교
  if (currentStage !== payload.currentStage)
    return { status: 'fail', message: 'Current Stage Mismatch' };

  const serverTime = Date.now(); // 현재 타임스탬프
  const elapsedTime = (serverTime - currentStage.timestamp) / 1000;
  // 경과 시간 = 서버 시간 - 현재 유저가 있는 스테이지의 timestamp 입니다.
  // timestamp는 milli seconds로 1000 -> 1초가 된다
  // 따라서 1000을 나눠 1초 당 1점을 얻도록 만들어준다.

  // 과제 1-> 2 뿐만이 아닌 전체에서 동작할 수 있는 코드로 만들기
  // 1스테이지 -> 2스테이지로 넘어가는 과정
  if (elapsedTime < 100 || elapsedTime > 105) {
    return { status: 'fail', message: 'Invalid elapsed time' };
  }

  // targetStage 대한 검증 <- 게임 에셋에 존재하는가?
  const { stages } = getGameAssets();
  if (!stages.data.some((stage) => stage.id === payload.targetStage))
    return { status: 'fail', message: 'Target Stage Not Found' };

  // 과제 Todo
  // : stage.json 파일 내용물로 내용물 검증하기
  // 점수를 비교해서 유저가 스테이지를 이동할 점수를 얻었는지 확인하는 코드 넣기
  //

  setStage(userId, payload.targetStage, serverTime);
  // 다음 스테이지를 제공하는 함수

  return { status: 'success' };
};
// userId 와 payload를 인자로 받는 moveStageHandler 함수를 선언합니다.
// 우선은 아무런 처리도 하지않습니다. 맵핑 이후에 처리하는 코드를 작성할 에정입니다.

export { moveStageHandler };

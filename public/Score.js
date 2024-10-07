import { sendEvent } from './Socket.js';
import stageJson from './assets/stage.json' with { type: 'json' };
import itemJson from './assets/item.json' with { type: 'json' };
import { unLockItem } from './index.js';

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  // 마지막 스테이지 점수 조건

  stages = stageJson.data;
  currentStage = this.stages[0];
  targetStage = this.stages[this.currentStage.scorePerSecond];

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001 * this.currentStage.scorePerSecond;
    // 1초당 scorePerSecond 만큼 점수 얻음
    const currendScore = Math.floor(this.score);

    //console.log('다음 스테이지 : ', this.targetStage.score, ', 현재 스테이지 : ', this.score);
    if (this.targetStage) {
      if (this.targetStage.score <= currendScore && this.stageChange) {
        // 스테이지 클리어 점수보다 현재 점수가 더 높을 경우

        this.stageChange = false;
        // 중복 실행 방지

        // 다음 스테이지 아이템 해금
        unLockItem(this.targetStage.id);

        sendEvent(11, { currentStage: this.currentStage, targetStage: this.targetStage });
        // 유저가 진행한 현재 스테이지와 다음 스테이지를 서버에 제공 및 검증 요청

        sendEvent(101, {
          currentStageId: this.currentStage.id,
          targetStageId: this.targetStage.id,
        });
        // 유저가 진행한 현재 스테이지와 다음 스테이지에 따른 아이템 해금 정보 서버에 제공 및 검증 요청

        this.currentStage = this.targetStage;
        // 현재 스테이지를 다음 스테이지로 변경

        this.targetStage = this.stages[this.currentStage.scorePerSecond];
        // 다음 스테이지를 그 다음 스테이지로 변경
      }
    }

    // 스테이지 이동이 완료된 상태라 스테이지 변경 허용으로 설정
    if (!this.stageChange) this.stageChange = true;
  }
  // 아이템 먹을 경우 점수
  getItem(itemId) {
    this.score += itemJson.data[itemId - 1].score;
    // Item 정보가 담긴 JSON 파일에서 해당 Item id - 1에 해당하는 점수 추가

    sendEvent(201, { stageId: this.currentStage.id, itemId });
    // 유저가 진행 중인 스테이지 id와 먹은 아이템 id 제공
  }

  reset() {
    this.score = 0;
    // 게임 종료시 점수 초기화
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;
    const stageX = highScoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    // stage 정보 만들기
    const stageNumber = this.stages.indexOf(this.currentStage) + 1;

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
    this.ctx.fillText(`Stage : ${stageNumber}`, stageX, y);
  }
}

export default Score;

import { sendEvent } from './Socket.js';

import stageJson from './assets/stage.json' with { type: 'json' };
import itemJson from './assets/item.json' with { type: 'json' };

import { unLockItem } from './index.js';
class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  scorePerSecond = 1;
  // 마지막 스테이지 점수 조건
  stages = stageJson.data;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001 * this.scorePerSecond;
    // 1초당 scorePerSecond 만큼 점수 얻음

    const currentScore = Math.min(
      Math.floor(this.score),
      this.stages[this.stages.length - 1].score,
    );
    // 마지막 스테이지 넘어가는 점수이면 마지막 스테이지로 고정



    //
    // Todo
    // 클라이언트 스테이지 이동 점수 되면 스테이지 이동 하는 코드 변경하기


    if (&& this.stageChange) {
      // 0 아닌 100 배수 단위 점수이면,

      this.stageChange = false;
      // 중복 실행 방지

      const currentStage = this.stages.find((stage) => stage.score === currentScore - 100);
      // 현재 점수 - 100 => 현재 스테이지 시작 점수
      const targetStage = this.stages.find((stage) => stage.score === currentScore);
      // 현재 점수를 기반으로 다음 스테이지
      this.scorePerSecond = targetStage.scorePerSecond;
      // 다음 스테이지 점수 배율
      unLockItem(targetStage.id);
      sendEvent(11, { currentStage, targetStage });
      sendEvent(101, { currentStageId: currentStage.id, targetStageId: targetStage.id });
    }

    // 100의 배수가 아니면 스테이지 이동 허용 가능 상태로 만든다.
    if (currentScore % 100 !== 0 && !this.stageChange) this.stageChange = true;
  }

  // 아이템 먹을 경우 점수
  getItem(itemId) {
    console.log('아이템 : ', itemId);
    this.score += itemJson.data[itemId].score;
    sendEvent(201, { itemId });
  }

  reset() {
    this.score = 0;
    this.scorePerSecond = 1;
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

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;

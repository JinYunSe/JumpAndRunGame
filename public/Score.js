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
        // 0 아닌 100 배수 단위 점수이면,
        console.log('동작 유무 확인');
        this.stageChange = false;
        // 중복 실행 방지

        // 다음 스테이지 점수 배율
        unLockItem(this.targetStage.id);
        sendEvent(11, { currentStage: this.currentStage, targetStage: this.targetStage });
        sendEvent(101, {
          currentStageId: this.currentStage.id,
          targetStageId: this.targetStage.id,
        });
        this.currentStage = this.targetStage;
        this.targetStage = this.stages[this.currentStage.scorePerSecond];
      }
    }

    // 100의 배수가 아니면 스테이지 이동 허용 가능 상태로 만든다.
    if (currendScore % 100 !== 0 && !this.stageChange) this.stageChange = true;
  }
  // 아이템 먹을 경우 점수
  getItem(itemId) {
    this.score += itemJson.data[itemId - 1].score;
    sendEvent(201, { stageId: this.currentStage.id, itemId });
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

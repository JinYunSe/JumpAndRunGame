import { sendEvent } from './Socket.js';
import stageJson from './assets/stage.json' with { type: 'json' };
import itemJson from './assets/item.json' with { type: 'json' };
class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  scorePerSecond = 1;
  lastStageScore = stageJson.data[stageJson.data.length - 1].score;
  // 마지막 스테이지 점수 조건

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001 * this.scorePerSecond;
    console.log('시간 당 점수 : ', this.scorePerSecond);

    const currentScore = Math.min(Math.floor(this.score), this.lastStageScore);

    if (currentScore % 100 === 0 && this.stageChange && currentScore !== 0) {
      this.stageChange = false;

      const currentStage = stageJson.data.find((stage) => stage.score === currentScore - 100);
      const targetStage = stageJson.data.find((stage) => stage.score === currentScore);

      this.scorePerSecond = targetStage.scorePerSecond;

      sendEvent(11, { currentStage, targetStage });
    }

    if (currentScore % 100 !== 0 && !this.stageChange) this.stageChange = true;
  }

  getItem(itemId) {
    //console.log('아이템 : ', itemId);
    //this.score += itemJson.data[itemId].score;
    //sendEvent(21, { changeScore: this.score });
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

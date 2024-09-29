class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  update(deltaTime) {
    this.score += deltaTime * 0.001;

    // 점수가 100점 이상이 될 경우 서버에 메시지를 전송한다.
    if (Math.floor(this.score === 100 && this.stageChange)) {
      this.stageChange = false;

      //현재는 1스테이지에서 2스테이지 이동만 존재합니다.
      //향후 유기적으로 만들기
      sendEvent(11, { currentStage: 1000, targetStage: 1001 });
      // 11번은 스테이지 이동을 담당하는 handler를 지정해줍니다.
    }
  }

  // 아이템을 먹을 경우 서버에 요청을 보내서
  // 과제에서 사용해야하는 코드 부분
  // 점수 계산을 처리한다.
  getItem(itemId) {
    this.score += 0;
  }

  // 점수 를 초기화 하는 함수
  reset() {
    this.score = 0;
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

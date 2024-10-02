// 아이템과 충돌.js
import itemUnlockJson from './assets/item_unlock.json' with { type: 'json' };
import itemJson from './assets/item.json' with { type: 'json' };

import Item from './Item.js';
class ItemController {
  INTERVAL_MIN = 0;
  INTERVAL_MAX = 12000;

  nextInterval = null;
  items = [];
  stage_id = 1000;

  constructor(ctx, itemImages, scaleRatio, speed) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.itemImages = itemImages;
    this.scaleRatio = scaleRatio;
    this.speed = speed;
    this.createItem();
    this.setNextItemTime();
  }

  setNextItemTime() {
    this.nextInterval = this.getRandomNumber(this.INTERVAL_MIN, this.INTERVAL_MAX);
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  createItem() {
    //console.log('stage_id : ', this.stage_id);
    // stage_id 가져오기

    const itemUnlockData = itemUnlockJson.data.find(
      (itemUnlock) => itemUnlock.stage_id === this.stage_id,
    );
    // stage_id에 따른 itemUnlock 정보 가져오기
    //console.log('itemUnlockData : ', itemUnlockData);

    const itemData = itemJson.data.find((item) => item.id === itemUnlockData.item_id);
    // itemUnlockData의 item_id와 같은 id를 가진 ItemData 가져오기

    const index = this.getRandomNumber(0, itemData.id - 1);
    // 아이템 생성 주기
    //  0 ~ 현재언락된 아이템의 id - 1로
    // 생성할 아이템 결정

    const itemInfo = this.itemImages[index];
    const x = this.canvas.width * 1.5;
    const y = this.getRandomNumber(10, this.canvas.height - itemInfo.height);

    const item = new Item(
      this.ctx,
      itemInfo.id,
      x,
      y,
      itemInfo.width,
      itemInfo.height,
      itemInfo.image,
    );

    this.items.push(item);
    //console.log('아이템 리스트 : ', this.items);
  }

  update(gameSpeed, deltaTime) {
    console.log('stage_id : ', this.stage_id);

    if (this.nextInterval <= 0) {
      this.createItem();
      this.setNextItemTime();
    }

    this.nextInterval -= deltaTime;

    this.items.forEach((item) => {
      item.update(this.speed, gameSpeed, deltaTime, this.scaleRatio);
    });

    this.items = this.items.filter((item) => item.x > -item.width);
  }

  draw() {
    this.items.forEach((item) => item.draw());
  }

  collideWith(sprite) {
    const collidedItem = this.items.find((item) => item.collideWith(sprite));
    if (collidedItem) {
      this.ctx.clearRect(collidedItem.x, collidedItem.y, collidedItem.width, collidedItem.height);
      return {
        itemId: collidedItem.id,
      };
    }
  }

  reset() {
    this.items = [];
  }
}

export default ItemController;
